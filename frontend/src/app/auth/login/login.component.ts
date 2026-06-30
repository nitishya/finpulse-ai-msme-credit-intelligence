import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center px-4">
  <!-- Background glow blobs -->
  <div class="absolute top-20 left-20 w-72 h-72 bg-blue-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
  <div class="absolute bottom-20 right-20 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl opacity-15 animate-pulse"></div>

  <div class="relative w-full max-w-md">
    <!-- Logo & Brand -->
    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/40">
        <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
        </svg>
      </div>
      <h1 class="text-3xl font-bold text-white tracking-tight">FinPulse AI</h1>
      <p class="text-blue-300 text-sm mt-1">MSME Financial Intelligence Platform</p>
    </div>

    <!-- Card -->
    <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
      <!-- Tabs -->
      <div class="flex bg-white/5 rounded-xl p-1 mb-6">
        <button (click)="mode='login'" [class]="mode==='login' ? 'flex-1 py-2 rounded-lg text-sm font-semibold bg-blue-600 text-white shadow-lg transition-all' : 'flex-1 py-2 rounded-lg text-sm font-semibold text-slate-400 hover:text-white transition-all'">
          Sign In
        </button>
        <button (click)="mode='register'" [class]="mode==='register' ? 'flex-1 py-2 rounded-lg text-sm font-semibold bg-blue-600 text-white shadow-lg transition-all' : 'flex-1 py-2 rounded-lg text-sm font-semibold text-slate-400 hover:text-white transition-all'">
          Register
        </button>
      </div>

      <form (ngSubmit)="submit()" #f="ngForm">
        <!-- Email -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
          <input type="email" [(ngModel)]="email" name="email" required
            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="you@company.com"/>
        </div>

        <!-- Password -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-slate-300 mb-2">Password</label>
          <input type="password" [(ngModel)]="password" name="password" required
            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="••••••••"/>
        </div>

        <!-- Role (Register only) -->
        <div class="mb-6" *ngIf="mode==='register'">
          <label class="block text-sm font-medium text-slate-300 mb-2">Register As</label>
          <select [(ngModel)]="role" name="role"
            class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
            <option value="MSME_USER">MSME Business Owner</option>
            <option value="BANKER">Banker / Credit Officer</option>
          </select>
        </div>

        <!-- Error -->
        <p *ngIf="error" class="text-red-400 text-sm mb-4 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{{ error }}</p>

        <!-- Submit Button -->
        <button type="submit" [disabled]="loading"
          class="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0">
          <span *ngIf="!loading">{{ mode === 'login' ? 'Sign In' : 'Create Account' }}</span>
          <span *ngIf="loading" class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
            Processing...
          </span>
        </button>
      </form>
    </div>

    <p class="text-center text-slate-500 text-xs mt-6">Powered by AI · Built for MSME Growth</p>
  </div>
</div>
  `
})
export class LoginComponent {
  mode: 'login' | 'register' = 'login';
  email = '';
  password = '';
  role = 'MSME_USER';
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.loading = true;
    this.error = '';
    const obs = this.mode === 'login'
      ? this.auth.login(this.email, this.password)
      : this.auth.register(this.email, this.password, this.role);

    obs.subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (e) => {
        this.error = e.error?.message || 'Invalid credentials. Please try again.';
        this.loading = false;
      }
    });
  }
}
