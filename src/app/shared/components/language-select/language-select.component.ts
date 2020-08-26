import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.scss']
})
export class LanguageSelectComponent implements OnInit {
  languages: any[] = [{ name: 'English', value: 'en' }, { name: 'عربي', value: 'ar' }];

  constructor(public translationService: TranslationService) { }

  ngOnInit(): void { }

}
