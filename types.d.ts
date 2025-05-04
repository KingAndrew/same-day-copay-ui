
// Type declarations for expo modules
declare module 'expo-camera' {
  import { Component } from 'react';
  
  export class Camera extends Component {
    static Constants: {
      Type: {
        front: string;
        back: string;
      };
      FlashMode: {
        on: string;
        off: string;
        auto: string;
        torch: string;
      };
    };
    
    static requestCameraPermissionsAsync(): Promise<{ status: string }>;
    takePictureAsync(options?: any): Promise<{ uri: string }>;
  }
}

declare module 'expo-modules-core/src/ts-declarations/global' {
  // Empty declaration to handle the type export
}

declare module 'expo-modules-core/src/index.ts' {
  export type * from './ts-declarations/global';
  export const NativeModule: any;
}

declare module 'expo-camera/build/CameraView' {
  import { Component } from 'react';
  const ExpoCamera: any;
  export default class CameraView extends Component {}
}
