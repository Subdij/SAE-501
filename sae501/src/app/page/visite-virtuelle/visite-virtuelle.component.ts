// visite-virtuelle.component.ts
import { Component, OnInit } from '@angular/core';
import { UnityLoaderService } from 'src/app/service/unity-loader.service'; 

@Component({
  selector: 'app-visite-virtuelle',
  templateUrl: './visite-virtuelle.component.html',
  styleUrls: ['./visite-virtuelle.component.scss']
})
export class VisiteVirtuelleComponent implements OnInit {

  constructor(private unityLoaderService: UnityLoaderService) { }

  ngOnInit(): void {
    this.unityLoaderService.loadScript('../../../assets/Build/Room_317.loader.js', 'unity-loader-script')
      .then(() => this.initializeUnity())
      .catch(error => console.error('Unity Loader script failed to load', error));
  }

  initializeUnity(): void {
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {

    }

    (window as any).createUnityInstance(document.querySelector("#unity-canvas"), {
      dataUrl: "../../../assets/Build/ee5d8c14b31c2742e312acdc0d6991f6.data",
      frameworkUrl: "../../../assets/Build/6888c2a15258417715851725724c7d14.js",
      codeUrl: "../../../assets/Build/55544f78c3b4b6252c5d4ebe93d479d7.wasm",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "DefaultCompany",
      productName: "Room_317",
      productVersion: "0.1.0",
    }).then((unityInstance: any) => {
      console.log('Unity instance loaded');
    }).catch((error: any) => {
      console.error('Error loading Unity', error);
    });
  }
}
