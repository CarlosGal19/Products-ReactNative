# React Native Project

Este repositorio contiene una aplicación de React Native. Sigue los siguientes pasos para clonar y configurar el proyecto en tu máquina local.

## Requisitos

Asegúrate de tener lo siguiente instalado en tu máquina local:

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm) o [yarn](https://yarnpkg.com/getting-started/install)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)

## Instalación

1. **Clonar el repositorio**

    ```sh
    git clone https://github.com/CarlosGal19/Products-ReactNative
    ```

2. **Navegar al directorio del proyecto**

    ```sh
    cd Products-ReactNative
    ```

3. **Instalar dependencias**

    Usando npm:

    ```sh
    npm install
    ```

    Usando yarn:

    ```sh
    yarn install
    ```

4. **Instalar dependencias específicas de la plataforma**

    Para iOS (necesitarás tener [CocoaPods](https://cocoapods.org/) instalado):

    ```sh
    cd ios
    pod install
    cd ..
    ```

## Uso

1. **Configurar variables de entorno**

    Crea un archivo `.env` en el directorio raíz del proyecto y agrega tus variables de entorno. Ejemplo:

    ```env
    EXPO_PUBLIC_API_URL=https://api-reactnative.onrender.com
    ```

2. **Iniciar la aplicación**

    Para Android:

    ```sh
    npx react-native run-android
    ```

    Para iOS:

    ```sh
    npx react-native run-ios
    ```
