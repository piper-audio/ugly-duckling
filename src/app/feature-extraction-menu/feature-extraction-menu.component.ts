import {Component, OnInit} from '@angular/core';
import {FeatureExtractionService} from "../services/feature-extraction/feature-extraction.service";

interface ExtractorInfo {
  key: string;
  name: string;
}

@Component({
  selector: 'app-feature-extraction-menu',
  templateUrl: './feature-extraction-menu.component.html',
  styleUrls: ['./feature-extraction-menu.component.css']
})
export class FeatureExtractionMenuComponent implements OnInit {

  extractors: ExtractorInfo[];

  constructor(private piperService: FeatureExtractionService) {
    this.extractors = [];
  }

  ngOnInit() {
    this.piperService.list().then(available => {
      available.available.forEach(staticData => this.extractors.push({
          key: staticData.key,
          name: staticData.basic.name
        })
      );
    });
  }

}
