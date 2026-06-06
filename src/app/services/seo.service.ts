import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  /**
   * Inject LocalBusiness JSON-LD Structured Data into the page header
   */
  injectLocalBusinessSchema(): void {
    try {
      const existingScript = this.document.getElementById('yarra-digital-seo-schema');
      if (existingScript) {
        return; // Already injected
      }

      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'yarra-digital-seo-schema';

      const schema = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        'name': 'Yarra Digital',
        'alternateName': 'Yarra Digital Web Development',
        'image': 'https://yarra.digital/assets/logo.png', // Fallback link
        '@id': 'https://yarra.digital/#localbusiness',
        'url': 'https://yarra.digital',
        'telephone': '0494 721 275',
        'priceRange': '$$',
        'description': 'Premium, blazing-fast website development for small businesses in Melbourne\'s North-East suburbs.',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Bundoora-Thomastown-Eltham North Area',
          'addressLocality': 'Melbourne North-East',
          'addressRegion': 'VIC',
          'postalCode': '3083',
          'addressCountry': 'AU'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': -37.6983,
          'longitude': 145.0645
        },
        'areaServed': [
          {
            '@type': 'AdministrativeArea',
            'name': 'Bundoora'
          },
          {
            '@type': 'AdministrativeArea',
            'name': 'Thomastown'
          },
          {
            '@type': 'AdministrativeArea',
            'name': 'Eltham North'
          },
          {
            '@type': 'AdministrativeArea',
            'name': 'Melbourne North-East Suburbs'
          }
        ],
        'openingHoursSpecification': {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
          ],
          'opens': '08:00',
          'closes': '20:00'
        },
        'sameAs': [
          'https://github.com/yarradigital',
          'https://yarra.digital'
        ]
      };

      script.text = JSON.stringify(schema);
      this.document.head.appendChild(script);
    } catch (e) {
      console.error('Error injecting local SEO schema', e);
    }
  }
}
