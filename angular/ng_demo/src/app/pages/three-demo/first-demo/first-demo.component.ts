import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-first-demo',
  templateUrl: './first-demo.component.html',
  styleUrls: ['./first-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FirstDemoComponent implements AfterViewInit {
  @ViewChild('container')
  container!: ElementRef<HTMLDivElement>;
  constructor(private render: Renderer2) {}
  ngAfterViewInit(): void {
    this.initThree();
  }
  initThree() {
    const containerElement: HTMLDivElement = this.container.nativeElement;
    const width = containerElement.clientWidth;
    const height = containerElement.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    // camera.lookAt(vector)
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    this.render.appendChild(containerElement, renderer.domElement);
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xfff });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;
    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();
  }
}
