export interface ServiceItem {
  name: string;
  type: 'letterhead' | 'envelope' | 'notepad' | 'folder' | 'book' | 'default' | 'paperbag';
}

export interface ServiceItemWithCategory extends ServiceItem {
  categoryName: string;
}

export interface ServiceCategory {
  name: string;
  desc: string;
  subServices: ServiceItem[];
}