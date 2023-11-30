export interface BannerImageAttributes {
  url?: string;
}

export interface BannerImageData {
  id?: string;
  attributes?: BannerImageAttributes;
}

export interface BannerItem {
  id?: string;
  image?: {
    data?: BannerImageData;
  };
  textPosition?: string;
  showButton?: boolean;
  buttonText?: string | null;
  buttonStyle?: string | null;
  caption?: string | null;
  textColor?: string | null;
  text?: string | null;
  title?: string | null;
  titleLine2?: string | null;
  link?: string | null;
}

export interface ComponentModulesBannerSlider {
  id?: string;
  bannerItems?: BannerItem[];
}

export interface HomeData {
  id?: string;
  attributes?: {
    modules?: (ComponentModulesBannerSlider | any)[];
  };
}

export interface Home {
  data?: HomeData;
}

export interface QueryResponse {
  home?: Home;
}
