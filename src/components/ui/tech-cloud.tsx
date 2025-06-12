'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';
import type { TechStackItem } from '@/types/portfolio';

interface TechCloudProps {
  items: Pick<TechStackItem, 'name' | 'iconName'>[];
}

interface PositionedItem extends Pick<TechStackItem, 'name' | 'iconName'> {
  x: number;
  y: number;
  scale: number;
  delay: number;
}

const TechCloud: React.FC<TechCloudProps> = ({ items }) => {
  const [positionedItems, setPositionedItems] = useState<PositionedItem[]>([]);

  useEffect(() => {
    const newItems = items.map((item, index) => {
      // Create a somewhat circular/oval distribution
      const angle = (index / items.length) * 2 * Math.PI;
      const radiusX = Math.random() * 40 + 20; // Random radius X (20-60%)
      const radiusY = Math.random() * 30 + 15; // Random radius Y (15-45%)
      
      return {
        ...item,
        x: 50 + radiusX * Math.cos(angle) * (Math.random() * 0.4 + 0.8), // Add some jitter
        y: 50 + radiusY * Math.sin(angle) * (Math.random() * 0.4 + 0.8),
        scale: Math.random() * 0.4 + 0.8, // Random scale (0.8 to 1.2)
        delay: index * 100, // Stagger animation
      };
    });
    setPositionedItems(newItems);
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 my-8">
      {positionedItems.map((item) => {
        const IconComponent = LucideIcons[item.iconName as keyof typeof LucideIcons] || LucideIcons.Code;
        return (
          <div
            key={item.name}
            className="absolute p-2 md:p-3 bg-card rounded-lg shadow-lg flex items-center space-x-2 transition-all duration-500 ease-out animate-fade-in opacity-0"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: `translate(-50%, -50%) scale(${item.scale})`,
              animationDelay: `${item.delay}ms`,
              willChange: 'opacity, transform',
            }}
            title={item.name}
          >
            <IconComponent className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            <span className="text-xs md:text-sm font-medium text-card-foreground hidden sm:inline">{item.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default TechCloud;
