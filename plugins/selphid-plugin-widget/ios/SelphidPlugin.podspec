Pod::Spec.new do |s|
  s.name         = "SelphidPlugin"
  s.version      = "1.0.0"
  s.summary      = "Cordova selphid drawer plugin"
  s.description  = <<-DESC
                  fphi-cordova-selphid-widget-plugin
                   DESC
  s.homepage     = "http://www.facephi.com"
  s.license      = "MIT"
  s.authors      = { "Your Name" => "support@facephi.com" }
  
  s.platform     = :ios, "10.0"
  s.source       = { :git => "." }

  s.vendored_frameworks = 'Frameworks/FPhiSelphIDWidgetiOS.xcframework'
  s.dependency 'zipzap'
  s.dependency "Firebase/Analytics"
  s.dependency "Firebase/MLVision" 
  s.dependency "Firebase/MLVisionTextModel"
  
  s.static_framework = true

end