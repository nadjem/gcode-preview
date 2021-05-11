import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { WebGLPreview } from 'gcode-preview';
import * as THREE from 'three';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,AfterViewInit {
  @ViewChild('previews') previews: ElementRef;
  preview:WebGLPreview;
  topLayerColor="'lime'";
  lastSegmentColor="'red'";
  endLayer;
  startLayer=20;
  lineWidth;
  layerCount;
  filePath = "assets/dragoncito.gcode"
  constructor() { }

  ngOnInit(): void {
    

  }
  ngAfterViewInit(): void{
    this.preview = new WebGLPreview({
      canvas: this.previews.nativeElement,
      endLayer: this.endLayer,
      startLayer: this.startLayer,
      topLayerColor: new THREE.Color(this.topLayerColor).getHex(),
      lastSegmentColor: new THREE.Color(this.lastSegmentColor).getHex(),
      lineWidth: this.lineWidth,
      buildVolume: {x: 220, y:220, z: 250},
      initialCameraPosition: [0, 400, 450]
    });
    this.loadFiles(this.filePath);
  }

  async loadFiles(path){
    const lines1 = await this.fetchGcode(path);
    this.loadPreviewChunked(this.preview, lines1, 50);
  }
  data() {
    return {
      layerCount: 0
    }
  }
  processGCode(gcode) {
    this.preview.processGCode(gcode);
    this.layerCount = this.preview.layers.length;
  }
  async fetchGcode(url) {
   const response = await fetch(url);
    if (response.status !== 200) {
      throw new Error(`status code: ${response.status}`);
    }
    const file = await response.text();
    return file.split('\n');
  }
  loadPreviewChunked(target, lines, delay) {
    let chunkSize = 250;
    let c = 0;
    const id = '__animationTimer__' + Math.random().toString(36).substr(2, 9);
    console.log(lines)
    const loadProgressive = (preview) => {
      const start = c*chunkSize;
      const end = (c+1)*chunkSize;
      const chunk = lines.slice(start, end);
      target.processGCode(chunk)
      // this.layersLoaded = target.layerCount;
      c++;
      if (c*chunkSize < lines.length) { 
        window[id] = setTimeout(loadProgressive, delay);
      }
    }
    // cancel loading process if one is still in progress
    // mostly when hot reloading
    window.clearTimeout(window[id]);
    loadProgressive(target);
  }

  replay(){
    this.loadFiles(this.filePath);
  }

}
