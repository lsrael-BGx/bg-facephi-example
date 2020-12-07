/********* WidgetSelphID.m Cordova Plugin Implementation *******/

#import <Cordova/CDV.h>
#import <FPhiSelphIDWidgetiOS/FPhiSelphIDWidgetiOS.h>

@interface WidgetSelphID : CDVPlugin<FPhiSelphIDWidgetProtocol> {
}

@property (nonatomic) FPhiSelphIDWidget *uc;
@property (nonatomic) NSString *lastCallbackId;

@property int whatDoing;
@property NSMutableArray *data;

@property NSMutableArray *dummyData;

- (void)StartCapture:(CDVInvokedUrlCommand*)command;
+ (NSString*)base64forData:(NSData*)theData;

@end

@implementation WidgetSelphID

- (BOOL)prefersStatusBarHidden {
    
    // DETECT iPhone X @Hack: no parece que exista una forma mejor de detectar el iPhone X
    if ([[UIScreen mainScreen] nativeBounds].size.height == 1792 ||
        [[UIScreen mainScreen] nativeBounds].size.height == 2436 ||
        [[UIScreen mainScreen] nativeBounds].size.height == 2688) {
        return false;
    }
    
    return true;
}


- (void)StartCapture:(CDVInvokedUrlCommand*)command
{
    NSLog(@"StartCapture method fired.");
    NSDictionary* arguments = [command.arguments objectAtIndex:0];
    NSString *resourcesPath = [arguments objectForKey:@"resourcesPath"];
    NSString *license = [arguments objectForKey:@"license"];
    NSError *error = nil;
    NSBundle *bundle = [NSBundle bundleForClass:[WidgetSelphID class]];
    NSString *strBundle = [bundle pathForResource:resourcesPath ofType:@"zip"];
    
    _uc = [[FPhiSelphIDWidget alloc]initWithFrontCameraIfAvailable :true
                                         resources:[bundle pathForResource:resourcesPath ofType:@"zip"]
                                         delegate:self
                              license:license
                                         error:&error];
    
    

    
    CDVPluginResult* pluginResult = nil;
    NSString *mode = [arguments objectForKey:@"operation"]; // Front, Back, All
    NSDictionary *config = [arguments objectForKey:@"config"];
    
    
    
    if (error != nil) {
        switch (error.code) {
            case FWMEUnknown:
            {
                NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];
                [dict setObject:[NSNumber numberWithInt:2] forKey:@"finishStatus"];
                [dict setObject:[NSNumber numberWithInt:1] forKey:@"errorType"];
                CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:dict];
                [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                break;
            }
            case FWMECameraPermission:
            {
                NSMutableDictionary *dict = [
                                             [NSMutableDictionary alloc] init];
                [dict setObject:[NSNumber numberWithInt:2] forKey:@"finishStatus"];
                [dict setObject:[NSNumber numberWithInt:3] forKey:@"errorType"];
                CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:dict];
                [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                break;
            }
        }
        
        NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];
        [dict setObject:[NSNumber numberWithInt:2] forKey:@"finishStatus"];
        [dict setObject:[NSNumber numberWithInt:3] forKey:@"errorType"];
        CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:dict];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        return;
    }
    
    // Check if there is new data
    
    
    if (config != nil) {
        NSObject *debug = [config objectForKey:@"debug"];
        if (debug != nil)
            _uc.debugMode = ((NSNumber *)debug).boolValue;
        
        NSObject *showAfterCapture = [config objectForKey:@"showResultAfterCapture"];
        if (showAfterCapture != nil)
            _uc.showAfterCapture = ((NSNumber *)showAfterCapture).boolValue;
            
         NSObject *tokenImageQuality = [config objectForKey:@"tokenImageQuality"];
        if (tokenImageQuality != nil)
            _uc.tokenImageQuality = ((NSNumber *)tokenImageQuality).floatValue;
            
        
        NSObject *showTutorial = [config objectForKey:@"showTutorial"];
        if (showTutorial != nil)
            _uc.showTutorial = ((NSNumber *)showTutorial).boolValue;
        
        
        NSString *scanMode = [config objectForKey:@"scanMode"]; // Front, Back, Wizard
        if (scanMode != nil) {
            if ([scanMode compare:@"Generic"] == NSOrderedSame) {
                _uc.scanMode = SMGeneric;
            } else if ([scanMode compare:@"Specific"] == NSOrderedSame) {
                _uc.scanMode = SMSpecific;
            } else if ([scanMode compare:@"Search"] == NSOrderedSame) {
                _uc.scanMode = SMSearch;
            } else {
                _uc.scanMode = SMGeneric;
            }
            
            NSObject *specificData = [config objectForKey:@"specificData"];
            if (specificData != nil && specificData != (NSString*)[NSNull null])
                _uc.specificData = ((NSString *)specificData);
            else
                _uc.specificData = @"";
        }
        
        NSObject *wizardMode = [config objectForKey:@"wizardMode"];
        if (wizardMode != nil) {
            _uc.wizardMode = ((NSNumber *)wizardMode).boolValue;
        }
        
        NSObject *locale = [config objectForKey:@"locale"];
        if (locale != nil && locale != (NSString*)[NSNull null])
            _uc.locale = ((NSString *)locale);
        else
            _uc.locale = @"";
        
    }
    
    NSString *documentType = [config objectForKey:@"documentType"]; // Front, Back, Wizard
    if (documentType != nil) {
        if ([documentType compare:@"DT_IDCard"] == NSOrderedSame) {
            _uc.scanType = DTIDCard;
        } else if ([documentType compare:@"DT_Passport"] == NSOrderedSame) {
            _uc.scanType = DTPassport;
        } else {
            _uc.scanType = DTIDCard;
        }
    }

    
    if ([mode compare:@"Front"] == NSOrderedSame) {
        _uc.scanSide = DSFront;
        _uc.wizardMode = false;
    } else if ([mode compare:@"Back"] == NSOrderedSame) {
        _uc.scanSide = DSBack;
        _uc.wizardMode = false;
    } else if ([mode compare:@"Wizard"] == NSOrderedSame) {
        _uc.scanSide = DSFront;
        _uc.wizardMode = true;
    } else if ([mode compare:@"Tutorial"] == NSOrderedSame) {
        _uc.showTutorial = true;
        _uc.showTutorialOnly = true;
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        return;
    }
    
    if (_uc.wizardMode)
        _uc.tokenPreviousCaptureData = nil;
    else {
        NSString *previousData = [arguments objectForKey:@"previousOCRData"]; // Front, Back, All
        _uc.tokenPreviousCaptureData = previousData;
    }
    
    self.lastCallbackId = command.callbackId;
    [_uc StartExtraction];
    
    [self.viewController presentViewController:_uc animated:true completion:nil];
}


// protocol implementation
-(NSDictionary<NSString*, NSString*>*) convertJsonToDictionary:(NSString*) previousData {
    if(previousData == nil)
        return nil;
    NSError *jsonError;
    NSData *objectData = [previousData dataUsingEncoding:NSUTF8StringEncoding];
    NSDictionary *json = [NSJSONSerialization JSONObjectWithData:objectData
                                                         options:NSJSONReadingMutableContainers
                                                           error:&jsonError];
    return json;
}

// protocol implementation
-(void) CaptureFinished {
    
    NSLog(@"StartCapture finished");
    
    NSMutableDictionary *dictResult = [self parseResults:(FPhiSelphIDWidget *)_uc];
    
    self.uc = nil;
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:dictResult];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:self.lastCallbackId];
}

-(NSString*) getBase64FromUIImage:(UIImage*)thisImage {
    NSData *data = UIImageJPEGRepresentation([self scaleAndRotateImage:thisImage], 0.9f);
    return [WidgetSelphID base64forData:data];
}

-(void) CaptureFailed:(NSError *)error {
    NSLog(@"StartCapture failed");
    
    self.uc = nil;
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Error"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:self.lastCallbackId];
}

-(void)CaptureCancelled {
    
    NSLog(@"StartCapture cancelled");
    
    NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];
    [dict setObject:[NSNumber numberWithInt:3] forKey:@"finishStatus"];
    [dict setObject:[NSNumber numberWithInt:2] forKey:@"errorType"];
    [dict setObject:[NSNumber numberWithInt:_uc.results.captureProgress] forKey:@"timeoutStatus"];
    
    self.uc = nil;
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:dict];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:self.lastCallbackId];
}

-(void)CaptureTimeout {
    
    NSLog(@"StartCapture timeout");
    
    NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];
    [dict setObject:[NSNumber numberWithInt:4] forKey:@"finishStatus"];
    [dict setObject:[NSNumber numberWithInt:2] forKey:@"errorType"];
    [dict setObject:[NSNumber numberWithInt:_uc.results.captureProgress] forKey:@"timeoutStatus"];
    
    NSMutableDictionary *dictResult = [self parseResults:(FPhiSelphIDWidget *)_uc];
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


-(NSMutableDictionary *) parseResults:(FPhiSelphIDWidget *)userControl {
    FPhiSelphIDWidgetExtractionData * data = _uc.results;
    
    NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];
    // Generic data
    [dict setObject:[NSNumber numberWithInt:1] forKey:@"finishStatus"];
    [dict setObject:[NSNumber numberWithInt:2] forKey:@"errorType"];
    
    [dict setObject:[NSNumber numberWithInt:_uc.results.captureProgress] forKey:@"timeoutStatus"];

    if(data.documentCaptured != nil) {
        [dict setObject:data.documentCaptured forKey:@"lastDocumentCaptured"];
    }
    
    if(data.frontDocument != nil)
        [dict setObject:[self getBase64FromUIImage:data.frontDocument] forKey:@"frontDocumentImage"];
    if(data.backDocument != nil)
        [dict setObject:[self getBase64FromUIImage:data.backDocument] forKey:@"backDocumentImage"];
    if(data.faceImage != nil)
        [dict setObject:[self getBase64FromUIImage:data.faceImage] forKey:@"faceImage"];
    if(data.rawFrontDocument != nil)
        [dict setObject:[self getBase64FromUIImage:data.rawFrontDocument] forKey:@"rawFrontDocument"];
    if(data.rawBackDocument != nil)
        [dict setObject:[self getBase64FromUIImage:data.rawBackDocument] forKey:@"rawBackDocument"];
    if(data.signatureImage != nil)
        [dict setObject:[self getBase64FromUIImage:data.signatureImage] forKey:@"signatureImage"];
    if(data.fingerprintImage != nil)
        [dict setObject:[self getBase64FromUIImage:data.fingerprintImage]
                 forKey:@"fingerprintImage"];
    
    if(data.tokenOCR != nil)
        [dict setObject:data.tokenOCR forKey:@"tokenOCR"];
    if(data.tokenFaceImage != nil)
        [dict setObject:data.tokenFaceImage forKey:@"tokenFaceImage"];
    if(data.tokenFrontDocument != nil)
        [dict setObject:data.tokenFrontDocument forKey:@"tokenFrontDocument"];
    if(data.tokenBackDocument != nil)
        [dict setObject:data.tokenBackDocument forKey:@"tokenBackDocument"];
    if(data.tokenRawFrontDocument != nil)
        [dict setObject:data.tokenRawFrontDocument forKey:@"tokenRawFrontDocument"];
    if(data.tokenRawBackDocument != nil)
        [dict setObject:data.tokenRawBackDocument forKey:@"tokenRawBackDocument"];
    
    NSMutableDictionary* dictOCR = [[NSMutableDictionary alloc] init];
    for (NSString *key in [data.ocrResults allKeys]) {
        [dictOCR setObject:data.ocrResults[key] forKey:key];
    }
    
    NSError* errorData;
    NSData* dictData = [NSJSONSerialization dataWithJSONObject:dictOCR
                                                       options: 0
                                                         error:&errorData];
    NSString* jsonString = [[NSString alloc] initWithData:dictData encoding:NSUTF8StringEncoding];
    if(jsonString != nil){
        [dict setObject:jsonString forKey:@"documentData"];
    }
    
    
    [dict setObject:[NSNumber numberWithFloat:data.matchingSidesScore]  forKey:@"matchingSidesScore"];
    
    return dict;
}

-(UIImage *)scaleAndRotateImage:(UIImage *)image {
    
    //int kMaxResolution = 640; // Or whatever
    
    CGImageRef imgRef = image.CGImage;
    
    CGFloat width = CGImageGetWidth(imgRef);
    CGFloat height = CGImageGetHeight(imgRef);
    
    
    CGAffineTransform transform = CGAffineTransformIdentity;
    CGRect bounds = CGRectMake(0, 0, width, height);
    /* if (width > kMaxResolution || height > kMaxResolution) {
     CGFloat ratio = width/height;
     if (ratio > 1) {
     bounds.size.width = kMaxResolution;
     bounds.size.height = roundf(bounds.size.width / ratio);
     }
     else {
     bounds.size.height = kMaxResolution;
     bounds.size.width = roundf(bounds.size.height * ratio);
     }
     } */
    
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

