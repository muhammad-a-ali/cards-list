import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  selectedLang: string = 'en';
  isArabic: boolean;
  isRtl: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  constructor(private translate: TranslateService) {
    this.setIsArabic();
    this.setDefaultLanguage();
  }

  /** 
   * Get the current language value from local storage.  
   * If current language value in local storage isn't null, switch language to current language.
   * Else, switch language to 'en'.
   * Set default language to selectedLang.
   */
  setDefaultLanguage() {
    const oldLang = localStorage.getItem('language');
    if (oldLang) {
      this.switchLanguage(oldLang);
      this.selectedLang = oldLang;
    }
    else {
      this.switchLanguage('en');
      this.selectedLang = 'en';
    }
  }

  /** 
   * Switch language that uses.
   * Calling firingIsRTL fn.
   * Calling storeLangValueInLocalStorage fn.
  */
  switchLanguage(lang: string) {
    this.translate.use(lang);
    this.firingIsRTL(lang);
    this.storeLanguageValueInLocalStorage(lang);
  };

  /**
   * Send false value to isRtl observable if language is english.
   * Send true value to isRtl observable if language is arabic.
   */
  private firingIsRTL(language: string) {
    if (language === 'en') this.isRtl.next(false);
    else if (language === 'ar') this.isRtl.next(true);
  };

  /** Store language value in local storage. */
  private storeLanguageValueInLocalStorage(language: string) {
    localStorage.setItem('language', language);
  }

  /** 
  * Subscribe to isRtl observable of translationService.
  * Assign isRtl observable value to isArabic property.
  */
  private setIsArabic(): void {
    this.isRtl.subscribe((isRtl: boolean) => { this.isArabic = isRtl });
  }

}
