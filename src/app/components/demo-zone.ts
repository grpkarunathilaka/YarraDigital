import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface MenuItem {
  name: string;
  description: string;
  price: number;
  available: boolean;
}

@Component({
  selector: 'app-demo-zone',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './demo-zone.html',
  styleUrl: './demo-zone.css'
})
export class DemoZone {
  // Restaurant Menu Demo State
  isGoogleSheetSyncing = signal(false);
  restaurantMenuItems = signal<MenuItem[]>([
    { name: 'Smashed Avo & Feta', description: 'With mint, cherry tomatoes on sourdough', price: 18.50, available: true },
    { name: 'Signature Cheeseburger', description: 'Wagyu beef, secret sauce, house pickles', price: 22.00, available: true },
    { name: 'Specialty Cold Brew', description: 'Single origin roasted locally in Eltham', price: 6.50, available: true }
  ]);

  // Simulate a change from Google Sheets
  simulateSpreadsheetEdit() {
    this.isGoogleSheetSyncing.set(true);
    setTimeout(() => {
      // Modify a price to simulate sheet sync
      const current = this.restaurantMenuItems();
      const updated = current.map(item => {
        if (item.name.includes('Cold Brew')) {
          // Toggle price between 6.50 and 5.50
          return { ...item, price: item.price === 6.50 ? 5.50 : 6.50 };
        }
        if (item.name.includes('Cheeseburger')) {
          // Toggle availability
          return { ...item, available: !item.available };
        }
        return item;
      });
      this.restaurantMenuItems.set(updated);
      this.isGoogleSheetSyncing.set(false);
    }, 1000);
  }

  // Trades Form Demo State
  tradesQuoteSubmitted = signal(false);
  tradesData = {
    service: 'Electrical Repair',
    name: 'Sarah from Bundoora',
    phone: '0412 345 678'
  };

  submitTradesQuote() {
    this.tradesQuoteSubmitted.set(true);
    // Auto reset after 4s
    setTimeout(() => {
      this.tradesQuoteSubmitted.set(false);
    }, 4000);
  }

  // Allied Health Booking Demo State
  bookingStep = signal<'select' | 'confirm' | 'done'>('select');
  selectedDate = signal<string>('Monday, June 8');
  selectedTime = signal<string>('10:00 AM');
  
  availableTimes = ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM'];

  selectTime(time: string) {
    this.selectedTime.set(time);
    this.bookingStep.set('confirm');
  }

  confirmBooking() {
    this.bookingStep.set('done');
  }

  resetBooking() {
    this.bookingStep.set('select');
  }
}
