/********* WidgetFacephi.m Cordova Plugin Implementation *******/

#import <Cordova/CDV.h>
#import <FPhiWidgetSelphi/FPhiWidgetSelphi.h>

@interface WidgetFacephi : CDVPlugin<FPhiWidgetProtocol> {
}
    
    @property (nonatomic) SelphiWidget *uc;
    @property (nonatomic) bool enableImages;
    @property (nonatomic) NSString *lastCallbackId;
    
- (void)StartWidget:(CDVInvokedUrlCommand*)command;
+ (NSString*)base64forData:(NSData*)theData;
    
    @end

@implementation WidgetFacephi
    
- (void)StartWidget:(CDVInvokedUrlCommand*)command
    {
        NSLog(@"StartWidget method fired.");
        NSDictionary* arguments = [command.arguments objectAtIndex:0];
        NSString *resourcesPath = [arguments objectForKey:@"resourcesPath"];
        NSError *error = nil;
        NSBundle *bundle = [NSBundle bundleForClass:[WidgetFacephi class]];
        NSString *strBundle = [bundle pathForResource:resourcesPath ofType:@"zip"];
        
        
        self.enableImages=false;
        CDVPluginResult* pluginResult = nil;
        NSString *mode = [arguments objectForKey:@"mode"];
        NSDictionary *config = [arguments objectForKey:@"config"];
        if (config != nil) {
            NSObject *isCameraFrontalPreferred = [config objectForKey:@"frontalCameraPreferred"];
            if (isCameraFrontalPreferred != nil)
            self.uc = [[SelphiWidget alloc]init :((NSNumber *)isCameraFrontalPreferred).boolValue  : strBundle :self :&error];
            else
            self.uc = [[SelphiWidget alloc]init :true  : strBundle :self :&error];
        } else {
            self.uc = [[SelphiWidget alloc]init :true  : strBundle :self :&error];
        }
        if (error != nil) {
            NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];
            [dict setObject:[NSNumber numberWithInt:2] forKey:@"finishStatus"];
            [dict setObject:[NSNumber numberWithInt:3] forKey:@"errorType"];
            [dict setObject:[NSNumber numberWithInt:1] forKey:@"livenessDiagnostic"];
            CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:dict];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
            return;
        }
        
        if (config != nil) {
            
            NSObject *debug = [config objectForKey:@"debug"];
            if (debug != nil)
            self.uc.debugMode = ((NSNumber *)debug).boolValue;
            
            NSObject *crop = [config objectForKey:@"crop"];
            if (crop != nil)
            self.uc.cropImagesToFace = ((NSNumber *)crop).boolValue;
            
            NSObject *cropRatio = [config objectForKey:@"cropPercent"];
            if (cropRatio != nil)
            self.uc.cropRatio = ((NSNumber *)cropRatio).floatValue;
            
            NSObject *sceneTimeout = [config objectForKey:@"sceneTimeout"];
            if (sceneTimeout != nil)
            self.uc.sceneTimeout = ((NSNumber *)sceneTimeout).floatValue;
            
            NSObject *enableImages = [config objectForKey:@"enableImages"];
            if (enableImages != nil)
            self.enableImages = ((NSNumber *)enableImages).boolValue;
            
            NSString *livenessMode = [config objectForKey:@"livenessMode"];
            if (livenessMode != nil && livenessMode != (NSString*)[NSNull null]){
                if([livenessMode compare:@"BLINK" ] == NSOrderedSame)
                self.uc.livenessMode = LMLivenessBlink;
                else if ([livenessMode compare:@"MOVE" ] == NSOrderedSame)
                self.uc.livenessMode = LMLivenessMove;
                else
                self.uc.livenessMode = LMLivenessNone;
            }
            
            /** MODS **/
            NSObject *userTags = [config objectForKey:@"uTags"];
            if (userTags != nil && userTags != (NSString*)[NSNull null]) {
                self.uc.userTags = [[NSData alloc] initWithBase64EncodedString:(NSString *)userTags options:0];
            }
            
            NSObject *locale = [config objectForKey:@"locale"];
            if (locale != nil && locale != (NSString*)[NSNull null])
            self.uc.locale = ((NSString *)locale);
            else
            self.uc.locale = @"";
            
            /*NSObject *qrValidatorExpression = [config objectForKey:@"qrValidatorExpression"];
             if (qrValidatorExpression)
             self.uc.qrValidatorExpression = ((NSString *)qrValidatorExpression); */
        }
        
        
        if ([mode compare:@"Authenticate"] == NSOrderedSame) {
            self.uc.extractionMode = EMAuthenticate;
        } else if ([mode compare:@"Register"] == NSOrderedSame) {
            self.uc.extractionMode = EMRegister;
        } else if ([mode compare:@"ShowTutorial"] == NSOrderedSame) {
            [self ShowTutorial:strBundle];
        } else {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
            return;
        }
        
        self.lastCallbackId = command.callbackId;
        [self.uc StartExtraction];
        [self.viewController presentViewController:self.uc animated:true completion:nil];
    }
    
- (void)ShowTutorial:(NSString *)resourcesPath {
    NSLog(@"ShowTutorial method fired.");
    //[FPhiWidgetTutorial ShowTutorial:self.viewController:FWTutLivenessMandatoryMode:resourcesPath];
}
    
    
    // protocol implementation
-(void) ExtractionFinished {
    
    NSLog(@"StartWidget finished");
    
    NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];
    [dict setObject:[NSNumber numberWithInt:1] forKey:@"finishStatus"];
    [dict setObject:[NSNumber numberWithInt:2] forKey:@"errorType"];
    [dict setObject:[NSNumber numberWithInt:(int)self.uc.livenessDiagnostic+1] forKey:@"livenessDiagnostic"];
    NSData *template = [self.uc.results.result getTemplate];
    [dict setObject:[WidgetFacephi base64forData:template] forKey:@"template"];
    
    NSData *templateRaw = [self.uc.results.result getTemplateRaw];
    if(templateRaw)
    [dict setObject:[WidgetFacephi base64forData:templateRaw] forKey:@"templateRaw"];
    
    [dict setObject:[NSNumber numberWithFloat:self.uc.results.result.templateInfo.eyeGlassesScore] forKey:@"eyeGlassesScore"];
    [dict setObject:[NSNumber numberWithFloat:self.uc.results.result.templateInfo.templateScore] forKey:@"templateScore"];
    
    if (self.uc.results.qrData != nil)
    [dict setObject:self.uc.results.qrData forKey:@"qrData"];
    
    NSMutableArray *images = [NSMutableArray array];
    if (self.enableImages) {
        if (self.uc.results.images != nil) {
            for (int a=0; a<self.uc.results.images.count; a++) {
                FPhiWidgetExtractionRecord *record = [self.uc.results.images objectAtIndex:a];
                NSData *data = UIImageJPEGRepresentation([self scaleAndRotateImage:record.image], 0.9f);
                NSString *base64String = [WidgetFacephi base64forData:data];
                // base64String = [NSString stringWithFormat:@"data:image/jpg;base64,%@",base64String];
                [images addObject:base64String];
            }
        }
    }
    [dict setObject:images forKey:@"images"];
    
    self.uc = nil;
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:dict];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:self.lastCallbackId];
}
    
-(void) ExtractionFailed:(NSError *)error {
    NSLog(@"StartWidget failed");
    
    self.uc = nil;
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Error"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:self.lastCallbackId];
}
    
-(void)ExtractionCancelled {
    
    NSLog(@"StartWidget cancelled");
    
    NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];
    [dict setObject:[NSNumber numberWithInt:3] forKey:@"finishStatus"];
    [dict setObject:[NSNumber numberWithInt:2] forKey:@"errorType"];
    [dict setObject:[NSNumber numberWithInt:1] forKey:@"livenessDiagnostic"];
    
    self.uc = nil;
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:dict];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:self.lastCallbackId];
}
    
-(void)ExtractionTimeout {
    
    NSLog(@"StartWidget timeout");
    
    NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];
    [dict setObject:[NSNumber numberWithInt:4] forKey:@"finishStatus"];
    [dict setObject:[NSNumber numberWithInt:2] forKey:@"errorType"];
    [dict setObject:[NSNumber numberWithInt:1] forKey:@"livenessDiagnostic"];
    
    self.uc = nil;
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:dict];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:self.lastCallbackId];
}
    
+ (NSString*)base64forData:(NSData*)theData {
    const uint8_t* input = (const uint8_t*)[theData bytes];
    NSInteger length = [theData length];
    
    static char table[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    
    NSMutableData* data = [NSMutableData dataWithLength:((length + 2) / 3) * 4];
    uint8_t* output = (uint8_t*)data.mutableBytes;
    
    NSInteger i;
    for (i=0; i < length; i += 3) {
        NSInteger value = 0;
        NSInteger j;
        for (j = i; j < (i + 3); j++) {
            value <<= 8;
            
            if (j < length) {
                value |= (0xFF & input[j]);
            }
        }
        
        NSInteger theIndex = (i / 3) * 4;
        output[theIndex + 0] =                    table[(value >> 18) & 0x3F];
        output[theIndex + 1] =                    table[(value >> 12) & 0x3F];
        output[theIndex + 2] = (i + 1) < length ? table[(value >> 6)  & 0x3F] : '=';
        output[theIndex + 3] = (i + 2) < length ? table[(value >> 0)  & 0x3F] : '=';
    }
    
    return [[NSString alloc] initWithData:data encoding:NSASCIIStringEncoding];
}
    
    
- (UIImage *)scaleAndRotateImage:(UIImage *)image {
    
    int kMaxResolution = 640; // Or whatever
    
    CGImageRef imgRef = image.CGImage;
    
    CGFloat width = CGImageGetWidth(imgRef);
    CGFloat height = CGImageGetHeight(imgRef);
    
    
    CGAffineTransform transform = CGAffineTransformIdentity;
    CGRect bounds = CGRectMake(0, 0, width, height);
    if (width > kMaxResolution || height > kMaxResolution) {
        CGFloat ratio = width/height;
        if (ratio > 1) {
            bounds.size.width = kMaxResolution;
            bounds.size.height = roundf(bounds.size.width / ratio);
        }
        else {
            bounds.size.height = kMaxResolution;
            bounds.size.width = roundf(bounds.size.height * ratio);
        }
    }
    
    CGFloat scaleRatio = bounds.size.width / width;
    CGSize imageSize = CGSizeMake(CGImageGetWidth(imgRef), CGImageGetHeight(imgRef));
    CGFloat boundHeight;
    UIImageOrientation orient = image.imageOrientation;
    switch(orient) {
        
        case UIImageOrientationUp: //EXIF = 1
        transform = CGAffineTransformIdentity;
        break;
        
        case UIImageOrientationUpMirrored: //EXIF = 2
        transform = CGAffineTransformMakeTranslation(imageSize.width, 0.0);
        transform = CGAffineTransformScale(transform, -1.0, 1.0);
        break;
        
        case UIImageOrientationDown: //EXIF = 3
        transform = CGAffineTransformMakeTranslation(imageSize.width, imageSize.height);
        transform = CGAffineTransformRotate(transform, M_PI);
        break;
        
        case UIImageOrientationDownMirrored: //EXIF = 4
        transform = CGAffineTransformMakeTranslation(0.0, imageSize.height);
        transform = CGAffineTransformScale(transform, 1.0, -1.0);
        break;
        
        case UIImageOrientationLeftMirrored: //EXIF = 5
        boundHeight = bounds.size.height;
        bounds.size.height = bounds.size.width;
        bounds.size.width = boundHeight;
        transform = CGAffineTransformMakeTranslation(imageSize.height, imageSize.width);
        transform = CGAffineTransformScale(transform, -1.0, 1.0);
        transform = CGAffineTransformRotate(transform, 3.0 * M_PI / 2.0);
        break;
        
        case UIImageOrientationLeft: //EXIF = 6
        boundHeight = bounds.size.height;
        bounds.size.height = bounds.size.width;
        bounds.size.width = boundHeight;
        transform = CGAffineTransformMakeTranslation(0.0, imageSize.width);
        transform = CGAffineTransformRotate(transform, 3.0 * M_PI / 2.0);
        break;
        
        case UIImageOrientationRightMirrored: //EXIF = 7
        boundHeight = bounds.size.height;
        bounds.size.height = bounds.size.width;
        bounds.size.width = boundHeight;
        transform = CGAffineTransformMakeScale(-1.0, 1.0);
        transform = CGAffineTransformRotate(transform, M_PI / 2.0);
        break;
        
        case UIImageOrientationRight: //EXIF = 8
        boundHeight = bounds.size.height;
        bounds.size.height = bounds.size.width;
        bounds.size.width = boundHeight;
        transform = CGAffineTransformMakeTranslation(imageSize.height, 0.0);
        transform = CGAffineTransformRotate(transform, M_PI / 2.0);
        break;
        
        default:
        [NSException raise:NSInternalInconsistencyException format:@"Invalid image orientation"];
        
    }
    
    UIGraphicsBeginImageContext(bounds.size);
    
    CGContextRef context = UIGraphicsGetCurrentContext();
    
    if (orient == UIImageOrientationRight || orient == UIImageOrientationLeft) {
        CGContextScaleCTM(context, -scaleRatio, scaleRatio);
        CGContextTranslateCTM(context, -height, 0);
    }
    else {
        CGContextScaleCTM(context, scaleRatio, -scaleRatio);
        CGContextTranslateCTM(context, 0, -height);
    }
    
    CGContextConcatCTM(context, transform);
    
    CGContextDrawImage(UIGraphicsGetCurrentContext(), CGRectMake(0, 0, width, height), imgRef);
    UIImage *imageCopy = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    
    return imageCopy;
}
    
    @end

