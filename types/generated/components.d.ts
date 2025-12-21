import type { Schema, Struct } from '@strapi/strapi';

export interface ContentCleaningArea extends Struct.ComponentSchema {
  collectionName: 'components_content_cleaning_areas';
  info: {
    description: 'Cleaning area section (kitchen, bathroom, etc.)';
    displayName: 'CleaningArea';
    icon: 'home';
  };
  attributes: {
    description: Schema.Attribute.Text;
    features: Schema.Attribute.JSON;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentCtaCard extends Struct.ComponentSchema {
  collectionName: 'components_content_cta_cards';
  info: {
    description: 'Call to action card';
    displayName: 'CTACard';
    icon: 'cursor';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_content_faq_items';
  info: {
    description: 'FAQ question and answer pair';
    displayName: 'FAQItem';
    icon: 'question';
  };
  attributes: {
    answer: Schema.Attribute.RichText & Schema.Attribute.Required;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_content_feature_items';
  info: {
    description: 'Feature list item with optional icon';
    displayName: 'FeatureItem';
    icon: 'check';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentOperatingHours extends Struct.ComponentSchema {
  collectionName: 'components_content_operating_hours';
  info: {
    description: 'Business operating hours';
    displayName: 'OperatingHours';
    icon: 'clock';
  };
  attributes: {
    day: Schema.Attribute.String & Schema.Attribute.Required;
    hours: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentServiceArea extends Struct.ComponentSchema {
  collectionName: 'components_content_service_areas';
  info: {
    description: 'Service coverage area/town';
    displayName: 'ServiceArea';
    icon: 'pin';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
    slug: Schema.Attribute.String;
  };
}

export interface ContentTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_content_testimonials';
  info: {
    description: 'Customer review/testimonial';
    displayName: 'Testimonial';
    icon: 'star';
  };
  attributes: {
    avatarBgColor: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'blue-500'>;
    clientLocation: Schema.Attribute.String;
    clientName: Schema.Attribute.String & Schema.Attribute.Required;
    rating: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      >;
    review: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface ContentTrustIndicator extends Struct.ComponentSchema {
  collectionName: 'components_content_trust_indicators';
  info: {
    description: 'Trust/stat indicator';
    displayName: 'TrustIndicator';
    icon: 'shield';
  };
  attributes: {
    description: Schema.Attribute.String & Schema.Attribute.Required;
    number: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedLocalSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_local_seos';
  info: {
    description: 'Local SEO fields for service/location pages';
    displayName: 'LocalSEO';
    icon: 'pin';
  };
  attributes: {
    city: Schema.Attribute.String;
    county: Schema.Attribute.String;
    metaDescriptionTemplate: Schema.Attribute.Text;
    metaTitleTemplate: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'{{serviceType}} Cleaning in {{city}} | Clensy'>;
    serviceType: Schema.Attribute.Enumeration<
      [
        'residential',
        'commercial',
        'airbnb',
        'medical',
        'office',
        'construction',
        'other',
      ]
    >;
    state: Schema.Attribute.String;
    zipCode: Schema.Attribute.String;
  };
}

export interface SharedOpenGraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_open_graphs';
  info: {
    description: 'Social sharing meta tags';
    displayName: 'OpenGraph';
    icon: 'share';
  };
  attributes: {
    ogDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 95;
      }>;
    twitterCard: Schema.Attribute.Enumeration<
      ['summary', 'summary_large_image']
    > &
      Schema.Attribute.DefaultTo<'summary_large_image'>;
  };
}

export interface SharedSchemaTemplate extends Struct.ComponentSchema {
  collectionName: 'components_shared_schema_templates';
  info: {
    description: 'Form-based structured data templates';
    displayName: 'SchemaTemplate';
    icon: 'code';
  };
  attributes: {
    address: Schema.Attribute.Text;
    businessName: Schema.Attribute.String;
    businessType: Schema.Attribute.String;
    customJsonLd: Schema.Attribute.JSON;
    openingHours: Schema.Attribute.JSON;
    priceRange: Schema.Attribute.String;
    schemaType: Schema.Attribute.Enumeration<
      [
        'LocalBusiness',
        'Service',
        'FAQPage',
        'Review',
        'Article',
        'BreadcrumbList',
        'Organization',
      ]
    > &
      Schema.Attribute.Required;
    telephone: Schema.Attribute.String;
  };
}

export interface SharedScriptInjection extends Struct.ComponentSchema {
  collectionName: 'components_shared_script_injections';
  info: {
    description: 'Custom script/tracking code injection';
    displayName: 'ScriptInjection';
    icon: 'code';
  };
  attributes: {
    bodyEndScripts: Schema.Attribute.Text;
    headScripts: Schema.Attribute.Text;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'SEO metadata component';
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaRobots: Schema.Attribute.Enumeration<
      ['index,follow', 'index,nofollow', 'noindex,follow', 'noindex,nofollow']
    > &
      Schema.Attribute.DefaultTo<'index,follow'>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    structuredData: Schema.Attribute.JSON;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'content.cleaning-area': ContentCleaningArea;
      'content.cta-card': ContentCtaCard;
      'content.faq-item': ContentFaqItem;
      'content.feature-item': ContentFeatureItem;
      'content.operating-hours': ContentOperatingHours;
      'content.service-area': ContentServiceArea;
      'content.testimonial': ContentTestimonial;
      'content.trust-indicator': ContentTrustIndicator;
      'shared.local-seo': SharedLocalSeo;
      'shared.open-graph': SharedOpenGraph;
      'shared.schema-template': SharedSchemaTemplate;
      'shared.script-injection': SharedScriptInjection;
      'shared.seo': SharedSeo;
    }
  }
}
