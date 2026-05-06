import { DOCUMENT } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { About } from './components/sections/about/about';
import { Contact } from './components/sections/contact/contact';
import { Footer } from './components/layout/footer/footer';
import { Gallery } from './components/sections/gallery/gallery';
import { Hero } from './components/sections/hero/hero';
import { Navbar } from './components/layout/navbar/navbar';
import { Services } from './components/sections/services/services';
import { WhyChooseUs } from './components/sections/why-choose-us/why-choose-us';
import { TranslationService } from './services/translation.service';

const SITE_ORIGIN = 'https://atyabaljazeera.com';

@Component({
  selector: 'app-root',
  imports: [Navbar, Hero, About, Services, Gallery, WhyChooseUs, Contact, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly document = inject(DOCUMENT);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly translation = inject(TranslationService);
  protected readonly direction = this.translation.direction;

  constructor() {
    effect(() => {
      const title = this.translation.t('seo.title') as string;
      const description = this.translation.t('seo.description') as string;
      const lang = this.translation.language();
      const canonical = lang === 'ar' ? `${SITE_ORIGIN}/?lang=ar` : `${SITE_ORIGIN}/`;
      const ogLocale = lang === 'ar' ? 'ar_AE' : 'en_AE';
      const ogLocaleAlt = lang === 'ar' ? 'en_AE' : 'ar_AE';

      this.titleService.setTitle(title);
      this.setMeta([
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: canonical },
        { property: 'og:locale', content: ogLocale },
        { property: 'og:locale:alternate', content: ogLocaleAlt },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description }
      ]);
      this.setCanonical(canonical);
    });
  }

  private setMeta(tags: Array<{ name?: string; property?: string; content: string }>): void {
    for (const tag of tags) {
      const selector = tag.name ? `name="${tag.name}"` : `property="${tag.property}"`;
      this.metaService.updateTag(tag, selector);
    }
  }

  private setCanonical(href: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }
}
