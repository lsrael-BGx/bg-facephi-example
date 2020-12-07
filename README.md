
# Cordova Selphi Plugin

## 1. Introducción

En este manual se documenta la configuración y funcionamiento de **FacePhi Selphi Cordova Widget 5.5.2** en aplicaciones desarrolladas para el entorno Cordova. Se describen:

- Propiedades, métodos y comunicación que integran este widget.
- Ejemplos de integración del plugin en una aplicación Cordova.

### 1.1 Versión del widget

La versión del widget se puede consultar de la siguiente manera:

- Buscamos el fichero `plugin.xml` en la raíz del plugin.
- En la etiqueta *version* se indica la versión.

También se puede ver desde la línea de comandos:

- Accedemos a la ruta de la aplicación Cordova que tenga el plugin instalado.
- Ejecutamos el siguiente comando para listar todos los plugins instalados en el proyecto: `cordova plugins`
- Al lado del nombre de cada plugin instalado aparecerá el número de versión.

### 1.2 Instalación del plugin

**Nota:** Considerar los siguientes valores:

`<%PLUGIN_CORE_PATH%> = “/lib/fphi-core-plugin-widget”`
`<%PLUGIN_SELPHI_PATH%> = “/lib/fphi-selphi-plugin-widget”`

Para instalar el plugin se deberán realizar los siguientes pasos:

1. Acceder a `<%APPLICATION_PATH%>`
2. `[ionic] cordova plugin add <% PLUGIN_CORE_PATH %>`
3. `[ionic] cordova plugin add <% PLUGIN_SELPHI_PATH %>`
4. `[ionic] cordova platform add android`
5. `[ionic] cordova platform add ios`
6. `[ionic] cordova build`

***

## 2. API (Interfaz de programación de aplicaciones)

El widget de Selphi para Cordova contiene una serie de clases de Javascript incluidas en la carpeta *www*, con la API necesaria para la comunicación entre la aplicación y las librerías nativas. A continuación se explican para qué sirve cada una de esas clases y sus propiedades.

### 2.1. Clase WidgetMode

A la hora de realizar la llamada al widget existe una serie de parámetros que se deben incluir. A continuación se comentarán brevemente:

#### 2.1.1. Authenticate

Establece el modo en el que se comporta el widget, teniendo un modo específico para cada escenario posible.

El widget queda configurado para realizar procesos de extracción de la mejor imagen y del template necesario para la autenticación.

### 2.2. Clase WidgetConfig

Se encuentra en la carpeta *www* del plugin, y contiene una serie de propiedades que configuran el funcionamiento del widget. En el apartado **2.3** se explican con de forma más exhaustiva en qué consisten esas propiedades.

#### 2.3 Configuración

El paso de argumentos entre la clase principal del proyecto y el plugin realiza mediante una clase llamada `WidgetConfig`. A continuación se muestra un ejemplo de inicialización:

    var config = new window.facephi.widget.config.WidgetConfig();
    config.setEnableImages(true);
    config.setLivenessMode(window.facephi.widget.livenessmode.PassiveMode);
    config.setDebug(false);

A continuación se comentarán todas las propiedades que pueden definirse en este objeto `WidgetConfig`:

#### 2.3.1. Crop (*bool*)

    config.setCrop(false);

Indica si las imágenes devueltas en el evento de finalización contienen sólo la zona de la cara detectada, con una ampliación dada por “CropPercent” o por el contrario se devuelve la imagen entera.

#### 2.3.2. CropPercent (*double*)

    config.setCropPercent(1.0);

Especifica el porcentaje que se amplía la zona de la cara detectada para componer la imagen que se devuelve.

#### 2.3.3. Debug (*bool*)

    config.setDebug(false);

Establece el modo de depuración del widget.

#### 2.3.4. LivenessMode (*SelphiFaceLivenessMode*)

    config.setLivenessMode(window.facephi.widget.livenessmode.PassiveMode);

Establece el modo liveness del widget. Los valores permitidos son:

- **None**: Indica que no debe activarse el modo detección de foto en los procesos de autenticación.
- **PassiveMode**: Indica que la prueba de vida pasiva se realiza en el servidor, enviando para tal fin la “BestImage” correspondiente.

#### 2.3.5. StabilizationMode (*bool*)

    config.setStabilizationMode(true);

Propiedad que permite activar o desactivar el modo de estabilizado previo al proceso de detección facial. En caso de estar activado dara unas directrices para saber si está correctamente ubicado o no.

#### 2.3.6. UTags (*String*)

    config.setUserTags(stringBase64);

Establece 4 bytes formateados a string base64 con datos que pueden ser configurados por la aplicación principal y que serán incorporados a las plantillas generadas por el extractor.

#### 2.3.7 Locale (*String*)

    configurationWidget.setLocale('ES');

Fuerza al widget a utilizar la configuración de idioma indicado por el parámetro locale.
Este parámetro acepta tanto un código de idioma (p. ej. *en*) como un código de identificación regional (p. ej. *en_US*). Si el archivo de recursos del widget no tuviera una localización para el *locale* seleccionado su configuración pasaría a utilizar el idioma por defecto.

#### 2.3.8. FullScreen (*bool*)

    configurationWidget.setEnableFullscreen(true);

Establece si se desea que el widget se arranque en modo pantalla completa, ocultando el status bar.

#### 2.3.9. EnableImages (*bool*)

    configurationWidget.setEnableImages(false);

Indica si el widget devuelve a la aplicación las imágenes utilizadas durante la extracción o no. Se debe tener en cuenta que devolver las imágenes puede acarrear un aumento considerable en el uso de los recursos del dispositivo.

#### 2.3.10 FrontalCameraPreferred (*bool*)

    configurationWidget.setFrontalCameraPreferred(true);

Propiedad que permite seleccionar la cámara frontal como cámara preferida.

#### 2.3.11 JPGQuality (*double*)

    configurationWidget.setJPGQuality(0.95);

Propiedad que permite establecer un porcentaje de calidad a la imagen de retorno (bestImage). El valor debe estar entre 0 y 1 (float).

#### 2.3.12 sceneTimeout (*double*)

    configurationWidget.setSceneTimeout(15.0);

Establece un valor de timeout en segundos para cada escena del widget.

## 3. Integración del plugin Cordova

### 3.1 Llamada al widget en modo Liveness Pasivo

Para poder ejecutar el modo pasivo, deberá realizarse la llamada al método `StartWidget` contenido en la clase `WidgetFacephi` tal y como se especifica a continuación:

    var config = new window.facephi.widget.config.WidgetConfig();
    config.setLivenessMode(window.facephi.widget.livenessmode.PassiveMode);
    window.facephi.widget.universal.StartWidget(onSuccessWidgetExtraction, onErrorWidgetExtraction, window.facephi.widget.mode.WidgetMode.Authenticate, resourcesBundlePath, config);

#### 3.1.1 ResourcesPath

Establece el nombre del archivo de recursos que utilizará el widget para su configuración gráfica. Este fichero es customizable y se encuentra en el plugin en la ruta raíz. Su instalación es transparente al usuario, simplemente se añadirá a los proyectos de las respectivas plataformas durante la instalación. En la ***sección 4*** se explica con más detalle el funcionamiento de este bundle de recursos y cómo modificarlo.

### 3.2 Resultado de la llamada al widget en Modo Pasivo

Tal y como se muestra en el ejemplo anterior, los resultados se devuelven a través de unos callbacks (en el ejemplo de programación reciben el nombre de `onSuccessWidgetExtraction` y `onErrorWidgetExtraction`) en formato ***JSON Object*** con todos los parámetros que retorna el plugin en formato clave-valor.

En caso de que el proceso se haya realizado correctamente, el resultado devolverá lo siguiente:

    {
        finishStatus = SelphiFaceFinishStatus;
        template = stringBase64;
        images = Array(stringBase64);
        errorType = SelphiFaceErrorType;
        errorMessage = string;
        templateRaw = stringBase64;
        bestImage = stringBase64;
        bestImageCropped = stringBase64;
        eyeGlassesScore = double;
        templateScore = double;
        qrData = string;
    }

Los parámetros recibidos son los siguientes:

- **finishStatus**: Devuelve el diagnóstico global de la operación. Los posibles valores para el tipo de excepción son:
  - **WidgetFinishStatus.StoppedManually**: Excepción que se produce cuando el usuario para la extracción de forma manual.
  - **WidgetFinishStatus.Timeout**: Excepción que se produce cuando transcurre un tiempo máximo sin conseguir finalizar la extracción con éxito.
  - **WidgetExceptionType.Ok**: Excepción que se produce cuando el widget no tiene permiso de acceso a la cámara.
  - **WidgetExceptionType.Error**: Se ha producido un error, el cuál se indicará en el enumerado `errorType` y, opcionalmente, se mostrará un mensaje de información extra en la propiedad `errorMessage`.
- **template**: Devuelve la plantilla de usuario que se genera después del proceso de extracción.
- **templateRaw**: Devuelve la plantilla en bruto que se genera después del proceso de extracción.
- **images**: Si el flag `enableImages` se activó en la configuración, devuelve las imágenes que se obtienen durante el proceso de extracción. Las imágenes se devuelven ordenadas por el instante de tiempo en el que se obtuvieron.
- **errorType**: Devuelve el tipo de error que se ha producido (en el caso de que haya habido uno, lo cual se indica en el parámetro `finishStatus` con el valor `error`). Se definen en la clase `WidgetErrorType`. Los valores que puede tener son los siguientes:
  - **UnknownError**. Error no gestionado. Posiblemente causado por un error en el bundle de recursos.
  - **NoError**: No ha ocurrido ningún error. El proceso puede continuar.
  - **CameraPermissionDenied**: Excepción que se produce cuando el widget no tiene permiso de acceso a la cámara.
  - **SettingsPermissionDenied**: Excepción que se produce cuando el widget no tiene permiso de acceso a la configuración del sistema (*deprecated*).
  - **HardwareError**: Excepción que surge cuando existe algún problema de hardware del dispositivo, normalmente causado porque los recursos disponibles son muy escasos.
  - **ExtractionLicenseError**: Excepción que ocurre cuando ha habido un problema de licencias en el servidor.
  - **UnexpectedCaptureError**: Excepción que ocurre durante la captura de frames por parte de la cámara.
  - **ControlNotInitializedError**: El configurador del widget no ha sido inicializado.
  - **BadExtractorConfiguration**: Problema surgido durante la configuración del widget.
- **errorMessage**: Indica un mensaje de error adicional en caso de ser necesario. Es un valor opcional.
- **bestImage**: Devuelve la mejor imagen extraída del proceso de registro o autenticación. Esta imagen es la imagen con el tamaño original extraída de la cámara.
- **bestImageCropped**: Devuelve una imagen recortada centrada en la cara del usuario. Esta imagen se obtiene a partir de la “bestImage”. Ésta es la imagen que se deberá utilizar como imagen característica del usuario que realizó el proceso de registro o autenticación a modo de ‘avatar’
- **eyeGlassesScore**: Devuelve la puntuación de la calidad del template.
- **templateScore**: Devuelve la puntuación de la probabilidad de que el usuario use gafas.
- **qrData**: Devuelve los datos del código QR capturado.

### 3.3 Llamada al método generateTemplateRaw

Genera un `templateRaw` a partir de una imagen URI (con cabecera) o una imagen en formato ***stringBase64***. El plugin la transforma a imagen nativa (***Bitmap*** en **Android** y ***UIImage*** en **IOS**) y se la envía al widget para generar el `templateRaw`. El widget devolverá el `templateRaw` en formato ***stringBase64***. Esta llamada es estática por lo que no requiere configuración del widget. Para realizar la llamada se debe ejecutar el siguiente código:

    String resultJson = await SelphiFacePlugin.generateTemplateRaw(imageBase64: _imageBase64);

***

## 4. Personalización del Widget

El widget permite la personalización de textos, imágenes, fuentes de letra y colores. La personalización se realiza mediante el archivo .zip suministrado con el widget. Este zip está compuesto de un fichero llamado `widget.xml` que contiene la definición de todas las pantallas del widget, cada una de ellas con una serie de elementos los cuales permiten realizar la personalización. El archivo zip también contiene una carpeta con recursos gráficos y otra carpeta con las traducciones de los textos.

### 4.1. Descripción básica

#### 4.1.1. Personalización de textos

La personalización de textos se realiza editando los textos de los archivos de traducciones existentes en el .zip de recursos.

    /strings/strings.es.xml
    /strings/strings.xml

#### 4.1.2. Personalización de imágenes

Para personalizar las imágenes que usa el widget se deben añadir las imágenes en el .zip de recursos. En el zip vienen 3 carpetas:

    /resources/163dpi
    /resources/326dpi
    /resources/489dpi

Estas carpetas corresponden a las diferentes densidades de pantalla y se pueden crear tantas carpetas de densidad como se desee. En estas carpetas están las versiones de las imágenes para cada una de las resoluciones.

Es necesario añadir las imágenes en todas las carpetas, ya que una vez determinada la resolución óptima para el dispositivo, el widget sólo carga imágenes de la carpeta con la resolución elegida.
Las imágenes son referenciadas desde el archivo `widget.xml`.

#### 4.1.3. Personalización de colores

La personalización de los colores de los botones se realiza desde el archivo `widget.xml`. En él se puede personalizar cualquier color de cualquier elemento gráfico que aparece en el widget. Simplemente basta con modificar el color de la propiedad deseada.

#### 4.1.4. Personalización de tipo de fuente

Los archivos de tipografía deben colocarse en la carpeta `/resources/163dpi` y una vez ahí pueden ser referenciados desde el archivo `widget.xml`. Para cambiar el tipo de letra de un elemento de texto bastaría con modificar la propiedad ‘font’ y poner el nombre del archivo correspondiente.

En el siguiente apartado se ampliará la información acerca del contenido del bundle de recursos y el modo de modificar.

### 4.2. Descripción avanzada

#### 4.2.1. Widget.xml

Este fichero contiene la definición de todas las propiedades que son configurables en los procesos de autenticación y registro. Está dividido por pantallas de navegación y dentro de cada etiqueta de pantalla se encuentran todas las propiedades que pueden modificarse.

#### 4.2.2. Carpeta strings

Esta carpeta contiene un fichero `strings.xml` por cada traducción que se desee soportar. El nombre debe estar formado de la siguiente manera:

    strings.(idioma).xml

Siendo (idioma) el código del idioma. Por ejemplo, `strings.es.xml` sería la traducción en castellano, `strings.en.xml` la traducción en inglés, `strings.es_ES.xml` el español de España o `strings.es_AR.xml` el español de Argentina.

Se puede forzar el idioma o dejar que el widget lo escoja en función de la configuración del dispositivo. A la hora de decidir cuál es el idioma a aplicar se sigue el siguiente orden:

- Buscar por código de localización (por ejemplo, “es_AR”).
- Si no encuentra ninguna que coincida, buscaría uno para el idioma genérico (es decir, en este caso sería “es”).
- Si tampoco existiese ningún resultado, entonces usaría el idioma por defecto.

A nivel de código es posible seleccionar la localización mediante la propiedad locale. Este parámetro acepta un string con el código de lenguaje que se desea utilizar (por ejemplo, “es” o “es_ES”).

#### 4.2.3. Carpeta resources

Contiene las carpetas con todos los recursos necesarios para poder modificarse, divididos en densidades. Es obligatorio generar las imágenes en todas las densidades ya que el widget espera encontrarlas en la carpeta correspondiente a la densidad del dispositivo. También se pueden crear nuevas carpetas con la densidad deseada.

#### 4.2.4. Elemento BACKGROUND

El elemento `background` se compone de 4 segmentos a los que se puede dar color independientemente:

- **top**: define el color de fondo el segmento o panel superior.
- **middle_top**: define el color de fondo del segmento o panel donde está situada la imagen de la cámara.
- **middle_bottom**: define el color de fondo el segmento o panel situado debajo de la imagen de la cámara.
- **bottom**: define el color de fondo el segmento o panel inferior.

También se pueden configurar ciertas propiedades que se usan solo en pantallas específicas. A continuación, las enumeramos haciendo referencia a las pantallas en la que son utilizadas:

- **pagination_separator (RegistrationTips, FaceMovementTips)**: define el color de la separación entre el panel inferior y el panel de debajo de la cámara.
- **mirror_border_color (RegistrationTips, FaceMovementTips)**: define el color del borde del círculo que rodea a la imagen de la cámara o del video de los consejos de registro. A este elemento también se le llama mirror o espejo.
- **mirror_border_width (RegistrationTips, FaceMovementTips)**: define el ancho del borde del círculo que rodea a la imagen de la cámara o del video de los consejos de registro. Si no deseáramos mostrar un borde, tendríamos que asignar un valor de 0.0 a esta propiedad.
- **mirror_mist_color (StartExtractor)**: define el color del círculo central en la pantalla previa a la extracción. Este color deberá tener siempre un valor de transparencia ya que debemos dejar ver la imagen de la cámara para que el usuario pueda colocarse correctamente antes de empezar con la extracción. El formato del color cuando se incluye un valor de transparencia es RGBA (El valor de alpha se indicará con el último byte).
- **mirror_color (Results)**: define el color de fondo del círculo que muestra los resultados del proceso de registro.

#### 4.2.5. Elemento BUTTON

- **background**: define el color de fondo el botón
- **decorator**: define el color de la sombra del botón
- **foreground**: define el color de la fuente del botón en caso de que el contenido sea un texto
- **content_type**: define el tipo de contenido del botón. Existen 2 tipos diferentes:
- **resource_id**: Content debe contener el nombre de un archivo en el bundle de recursos
- **text_id**: Content debe contener el identificador de un literal del fichero de traducciones del bundle de recursos
- **content**: define el contenido del botón. Puede ser tanto una imagen como el identificador de un literal.
- **align**: Define la alienación del contenido del botón, ya sea una imagen o un texto
- **font**: Define el tipo de letra utilizado si el contenido del botón es un texto
- **font_size**: Define el tamaño de la letra si el contenido del botón es un texto

#### 4.2.6. Elemento TEXT

Los elementos `text` se utilizan para definir el aspecto gráfico de los textos de cada una de las pantallas del widget. Estas son las propiedades que se pueden modificar:

- **color**: define el color del texto.
- **font**: define el tipo de fuente utilizado para mostrar el texto.
- **font_size**: define el tamaño de la fuente.

Hay que tener en cuenta que en la pantalla de resultados del registro los dos textos que definen la calidad del registro tienen forzado su color al color de la barra que indica la puntuación.

#### 4.2.7. Elemento IMAGE

- **value**: define el nombre del archivo que contiene la imagen a mostrar.

Los elementos `image` solo tienen la propiedad que define el archivo donde se encuentra la imagen físicamente en el bundle de recursos. Las imágenes se obtienen del bundle buscando en la carpeta apropiada de acuerdo con la densidad del dispositivo.

#### 4.2.8. Elemento VIDEO

- **value**: define el nombre del archivo que contiene el video a mostrar.

Los elementos `video` solo tienen la propiedad que define el archivo donde se encuentra el video físicamente en el bundle de recursos.

***

## 5. Requisitos

### 5.1. Requisitos mínimos para entorno Android

Para la correcta integración del widget de reconocimiento facial en un dispostivo Android, es necesario disponer de la siguiente versión del sistema operativo Android:

- API level 14 (Android 4.0)

En cuanto a la arquitectura del dispositivo móvil:

- armeabi-v7, x86, arm64 y x64

***

## 6. Información de contacto

Para cualquier consulta general, por favor, póngase en contacto con nosotros a través de las siguientes vías:

- info@facephi.com
- <http://www.facephi.com>
- Avenida México, 20. Alicante 03008. España.
- (+34) 965 10 80 08

Si quiere realizar consultas comerciales, utilice los medios facilitados a continuación:

- sales@facephi.com
- (+34) 965 10 80 08

Ante cualquier duda técnica, sugerencia o reporte, contacte a través de:

- support@facephi.com
- (+34) 965 10 80 08

Si desea realizar o hacernos llegar cualquier tipo de sugerencia o detecta algún tipo de error, contacte a través de:

- feedback@facephi.com
- (+34) 965 10 80 08
