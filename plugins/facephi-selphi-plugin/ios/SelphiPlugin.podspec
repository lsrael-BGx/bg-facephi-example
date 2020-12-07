Pod::Spec.new do |s|
  s.name         = "SelphiPlugin"
  s.version      = "1.0.0"
  s.summary      = "Cordova selphi drawer plugin"
  s.description  = <<-DESC
                  fphi-selphi-plugin-widget
                   DESC
  s.homepage     = "http://www.facephi.com"
  s.license      = "MIT"
  s.authors      = { "Your Name" => "support@facephi.com" }
  
  s.platform     = :ios, "10.0"
  s.source       = { :git => "." }

  s.vendored_frameworks = 'Frameworks/FPhiWidgetSelphi.xcframework'

  s.static_framework = true

end