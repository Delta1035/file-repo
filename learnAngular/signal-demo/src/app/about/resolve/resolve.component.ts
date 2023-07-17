import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resolve',
  templateUrl: './resolve.component.html',
  styleUrls: ['./resolve.component.scss'],
})
export class ResolveComponent implements OnInit {
  preloadData = '';
  constructor(private readonly route: ActivatedRoute) {}
  ngOnInit(): void {
    this.preloadData = this.route.snapshot.data['preloadData'];
  }
}
