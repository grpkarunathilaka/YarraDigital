import { Component, signal, OnInit } from '@angular/core';
import { NavBar } from './components/nav-bar';
import { Hero } from './components/hero';
import { Offer } from './components/offer';
import { DemoZone } from './components/demo-zone';
import { ContactForm } from './components/contact-form';
import { Footer } from './components/footer';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  imports: [NavBar, Hero, Offer, DemoZone, ContactForm, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('yarra-digital');

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    // Inject the LocalBusiness structured SEO schema on load
    this.seoService.injectLocalBusinessSchema();
  }
}
