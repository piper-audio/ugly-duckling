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
      const maxCharacterLimit = 50;
      available.available.forEach(staticData => {
        if (staticData.basicOutputInfo.length > 1)
          staticData.basicOutputInfo.forEach(output => this.extractors.push({
              key: `${staticData.key}:${output.identifier}`,
              name: `${staticData.basic.name}: ${output.name}`.substr(0, maxCharacterLimit) + '...'
            })
          );
        else
          this.extractors.push({
            key: staticData.key,
            name: staticData.basic.name.substr(0, maxCharacterLimit) + '...'
          });
      });
    });
  }

}
