Pod::Spec.new do |s|
  s.name         = "SelphiCorePlugin"
  s.version      = "1.0.0"
  s.summary      = "Cordova selphi core plugin"
  s.description  = <<-DESC
                  fphi-core-plugin-widget
                   DESC
  s.homepage     = "http://www.facephi.com"
  s.license      = "MIT"
  s.authors      = { "Your Name" => "support@facephi.com" }
  
  s.platform     = :ios, "10.0"
  s.source       = { :git => "." }

  s.vendored_frameworks = 'Frameworks/FPhiWidgetCore.xcframework', 'Frameworks/FPBExtractoriOS.xcframework'
  s.dependency 'zipzap'

  s.static_framework = true

end
