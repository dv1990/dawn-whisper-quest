import type { Product, Appliance } from '@/types/product';
import nessPodImage from '@/assets/ness-pod-product.png';
import nessProImage from '@/assets/ness-pro-product.png';
import nessCubeImage from '@/assets/ness-cube-product.png';
import { Wind, Coffee, Tv, Wifi, Fan, Lightbulb } from 'lucide-react';
import React from 'react';

/**
 * Product catalog configuration
 */
export const PRODUCTS: Product[] = [
  {
    id: 'ups',
    name: 'NESS UPS',
    tier: 'Grid Backup',
    image: nessPodImage,
    capacity: '5 kWh',
    backupTime: '12 hours',
    price: '₹89,999',
    idealFor: 'Backup from grid outage',
    features: ['Instant power during blackouts', 'No solar required', 'Simple plug-and-play']
  },
  {
    id: 'oneaio',
    name: 'NESS AIO',
    tier: 'Backup + Solar',
    image: nessCubeImage,
    capacity: '5-20 kWh',
    backupTime: '24-48 hours',
    price: '₹1,39,999',
    idealFor: 'Backup + Solar integration',
    features: ['Built-in solar inverter', 'Grid backup included', 'Save on electricity bills']
  },
  {
    id: 'brick',
    name: 'NESS AC Brick',
    tier: 'Retrofit Solution',
    image: nessProImage,
    capacity: '5-80 kWh',
    backupTime: 'Customizable',
    price: '₹1,89,999',
    idealFor: 'For existing on-grid installations',
    features: ['Works with your current system', 'AC-coupled design', 'Easy to expand']
  }
];

/**
 * Common household appliances for load calculation
 */
export const COMMON_APPLIANCES: Appliance[] = [
  { id: 'ac', name: 'Air Conditioner', icon: React.createElement(Wind, { className: 'w-5 h-5' }), watts: 1500, hours: 8 },
  { id: 'fridge', name: 'Refrigerator', icon: React.createElement(Coffee, { className: 'w-5 h-5' }), watts: 150, hours: 24 },
  { id: 'tv', name: 'TV', icon: React.createElement(Tv, { className: 'w-5 h-5' }), watts: 100, hours: 6 },
  { id: 'wifi', name: 'Wi-Fi Router', icon: React.createElement(Wifi, { className: 'w-5 h-5' }), watts: 20, hours: 24 },
  { id: 'fan', name: 'Ceiling Fans (3)', icon: React.createElement(Fan, { className: 'w-5 h-5' }), watts: 225, hours: 12 },
  { id: 'lights', name: 'LED Lights (10)', icon: React.createElement(Lightbulb, { className: 'w-5 h-5' }), watts: 100, hours: 8 }
];

/**
 * Home size options
 */
export const HOME_SIZES = ['1-2 BHK', '2-3 BHK', '3-4 BHK', '4+ BHK / Villa'];

/**
 * Solar status options
 */
export const SOLAR_STATUS = ['Yes', 'No', 'Planning to add'];
