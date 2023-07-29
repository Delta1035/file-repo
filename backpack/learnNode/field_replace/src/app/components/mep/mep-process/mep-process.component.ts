import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-mep-process',
    templateUrl: './mep-process.component.html',
    styleUrls: ['./mep-process.component.scss']
})
export class MepProcessComponent implements OnInit {

    @Input() activeStep: number = 0;

    stepList: any[] = [
        { content: 'Complete Month End' },
        { content: 'Upload TSS' },
        { content: 'Exception Report' },
        { content: 'Maintain PAJ Charge' },
    ]

    constructor() { }

    ngOnInit(): void {
    }

    index = 0;

    onIndexChange(event: number): void {
        this.index = event;
    }

}
