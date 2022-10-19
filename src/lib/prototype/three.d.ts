declare module "three/addons/loaders/GLTFLoader" {
  import { Loader, LoadingManager } from "three";

  export class GLTFLoader extends Loader {
    /**
     * Creates a new GLTFLoader.
     * @param manager The loadingManager for the loader to use. Default is THREE.DefaultLoadingManager.
     */
    constructor(manager: LoadingManager);

    /**
     * Begin loading from url and call the callback function with the parsed response content.
     * @param url A string containing the path/URL of the .gltf or .glb file.
     * @param onLoad A function to be called after the loading is successfully completed. The function receives the loaded JSON response returned from parse.
     * @param onProgress (optional) A function to be called while the loading is in progress. The argument will be the XMLHttpRequest instance, that contains .total and .loaded bytes. If the server does not set the Content-Length header; .total will be 0.
     * @param onError (optional) A function to be called if an error occurs during loading. The function receives error as an argument.
     */
    load(
      url: String,
      onLoad: Function,
      onProgress: Function,
      onError: Function
    ): undefined;

    /**
     *  Refer to this readme for the details of Draco and its decoder.
     * @param dracoLoader  Instance of THREE.DRACOLoader, to be used for decoding assets compressed with the KHR_draco_mesh_compression extension.
     */
    setDRACOLoader(dracoLoader: DRACOLoader): this;

    /**
     *
     * @param ktx2Loader Instance of THREE.KTX2Loader, to be used for loading KTX2 compressed textures.
     */
    setKTX2Loader(ktx2Loader: KTX2Loader): this;

    /**
     * Parse a glTF-based ArrayBuffer or JSON String and fire onLoad callback when complete. The argument to onLoad will be an Object that contains loaded parts: .scene, .scenes, .cameras, .animations, and .asset.
     * @param data glTF asset to parse, as an ArrayBuffer or JSON string.
     * @param path The base path from which to find subsequent glTF resources such as textures and .bin data files.
     * @param onLoad A function to be called when parse completes.
     * @param onError (optional) A function to be called if an error occurs during parsing. The function receives error as an argument.
     */
    parse(
      data: ArrayBuffer,
      path: String,
      onLoad: Function,
      onError: Function
    ): undefined;
  }
}
