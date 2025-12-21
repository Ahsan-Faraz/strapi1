import type { Schema, Struct } from '@strapi/strapi';

export interface AdminApiToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    encryptedKey: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'read-only'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminAuditLog extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_audit_logs';
  info: {
    displayName: 'Audit Log';
    pluralName: 'audit-logs';
    singularName: 'audit-log';
  };
  options: {
    draftAndPublish: false;
    timestamps: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.DateTime & Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::audit-log'> &
      Schema.Attribute.Private;
    payload: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    user: Schema.Attribute.Relation<'oneToOne', 'admin::user'>;
  };
}

export interface AdminPermission extends Struct.CollectionTypeSchema {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    conditions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::permission'> &
      Schema.Attribute.Private;
    properties: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<'manyToOne', 'admin::role'>;
    subject: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminRole extends Struct.CollectionTypeSchema {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::role'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<'oneToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<'manyToMany', 'admin::user'>;
  };
}

export interface AdminSession extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_sessions';
  info: {
    description: 'Session Manager storage';
    displayName: 'Session';
    name: 'Session';
    pluralName: 'sessions';
    singularName: 'session';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
    i18n: {
      localized: false;
    };
  };
  attributes: {
    absoluteExpiresAt: Schema.Attribute.DateTime & Schema.Attribute.Private;
    childId: Schema.Attribute.String & Schema.Attribute.Private;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deviceId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    expiresAt: Schema.Attribute.DateTime &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::session'> &
      Schema.Attribute.Private;
    origin: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    sessionId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique;
    status: Schema.Attribute.String & Schema.Attribute.Private;
    type: Schema.Attribute.String & Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    userId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferTokenPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::transfer-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminUser extends Struct.CollectionTypeSchema {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    blocked: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    lastname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::user'> &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    registrationToken: Schema.Attribute.String & Schema.Attribute.Private;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    roles: Schema.Attribute.Relation<'manyToMany', 'admin::role'> &
      Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String;
  };
}

export interface ApiAboutAbout extends Struct.SingleTypeSchema {
  collectionName: 'abouts';
  info: {
    description: 'About us page content';
    displayName: 'About Page';
    pluralName: 'abouts';
    singularName: 'about';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    clientFocusedTechFeatures: Schema.Attribute.JSON;
    clientFocusedTechHeading: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ctaBookButtonText: Schema.Attribute.String;
    ctaContactButtonText: Schema.Attribute.String;
    ctaDescription: Schema.Attribute.Text;
    ctaHeading: Schema.Attribute.String;
    customerTypes: Schema.Attribute.Component<'content.feature-item', true>;
    differentiators: Schema.Attribute.Component<'content.feature-item', true>;
    heroHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'About Clensy'>;
    heroTagline: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Raising the Standard, One Clean at a Time.'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::about.about'> &
      Schema.Attribute.Private;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    ourMissionContent: Schema.Attribute.RichText;
    ourMissionHeading: Schema.Attribute.String;
    ourStoryContent: Schema.Attribute.RichText;
    ourStoryHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Our Story'>;
    ourStoryImage: Schema.Attribute.Media<'images'>;
    publishedAt: Schema.Attribute.DateTime;
    scripts: Schema.Attribute.Component<'shared.script-injection', false>;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    whatMakesUsDifferentHeading: Schema.Attribute.String;
    whatMakesUsDifferentImage: Schema.Attribute.Media<'images'>;
    whoWeServeHeading: Schema.Attribute.String;
    whoWeServeSubtitle: Schema.Attribute.String;
    whyWeStartedContent: Schema.Attribute.RichText;
    whyWeStartedHeading: Schema.Attribute.String;
    whyWeStartedQuote: Schema.Attribute.Text;
    whyWeStartedSubtitle: Schema.Attribute.String;
  };
}

export interface ApiBlogPostBlogPost extends Struct.CollectionTypeSchema {
  collectionName: 'blog_posts';
  info: {
    description: 'Blog articles with full SEO';
    displayName: 'Blog Post';
    pluralName: 'blog-posts';
    singularName: 'blog-post';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    author: Schema.Attribute.String;
    categories: Schema.Attribute.JSON;
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    enableArticleSchema: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    excerpt: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 300;
      }>;
    excludeFromSitemap: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    featuredImage: Schema.Attribute.Media<'images'>;
    featuredImageAlt: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::blog-post.blog-post'
    > &
      Schema.Attribute.Private;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    publishedAt: Schema.Attribute.DateTime;
    publishedDate: Schema.Attribute.Date;
    readingTime: Schema.Attribute.Integer;
    scripts: Schema.Attribute.Component<'shared.script-injection', false>;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    tags: Schema.Attribute.JSON;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCareersPageCareersPage extends Struct.SingleTypeSchema {
  collectionName: 'careers_pages';
  info: {
    description: 'Careers/jobs page content';
    displayName: 'Careers Page';
    pluralName: 'careers-pages';
    singularName: 'careers-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    applicationFormEnabled: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    benefits: Schema.Attribute.Component<'content.feature-item', true>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    heroBackgroundImage: Schema.Attribute.Media<'images'>;
    heroHeading: Schema.Attribute.String;
    heroSubheading: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::careers-page.careers-page'
    > &
      Schema.Attribute.Private;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    openPositions: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    scripts: Schema.Attribute.Component<'shared.script-injection', false>;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    whyWorkWithUsHeading: Schema.Attribute.String;
  };
}

export interface ApiChecklistChecklist extends Struct.SingleTypeSchema {
  collectionName: 'checklists';
  info: {
    description: 'Cleaning checklist section';
    displayName: 'Checklist Section';
    pluralName: 'checklists';
    singularName: 'checklist';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    checklistItems: Schema.Attribute.JSON;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    heading: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::checklist.checklist'
    > &
      Schema.Attribute.Private;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    subheading: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiComparisonComparison extends Struct.SingleTypeSchema {
  collectionName: 'comparisons';
  info: {
    description: 'Service comparison section content';
    displayName: 'Comparison Section';
    pluralName: 'comparisons';
    singularName: 'comparison';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    comparisonData: Schema.Attribute.JSON;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    heading: Schema.Attribute.String;
    leftColumnTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Other Cleaners'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::comparison.comparison'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    rightColumnTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Clensy'>;
    subheading: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiContactContact extends Struct.SingleTypeSchema {
  collectionName: 'contacts';
  info: {
    description: 'Contact page content';
    displayName: 'Contact Page';
    pluralName: 'contacts';
    singularName: 'contact';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    contactAddress: Schema.Attribute.Text;
    contactEmail: Schema.Attribute.String;
    contactPhone: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    formHeading: Schema.Attribute.String;
    formSubheading: Schema.Attribute.Text;
    heroHeading: Schema.Attribute.String;
    heroSubheading: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::contact.contact'
    > &
      Schema.Attribute.Private;
    mapEmbedCode: Schema.Attribute.Text;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    operatingHours: Schema.Attribute.Component<'content.operating-hours', true>;
    publishedAt: Schema.Attribute.DateTime;
    scripts: Schema.Attribute.Component<'shared.script-injection', false>;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCtaCta extends Struct.SingleTypeSchema {
  collectionName: 'ctas';
  info: {
    description: 'Call to action section content';
    displayName: 'CTA Section';
    pluralName: 'ctas';
    singularName: 'cta';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Book our professional cleaning services today and experience the difference.'>;
    heading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Home cleaning you can trust'>;
    leftCard: Schema.Attribute.Component<'content.cta-card', false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::cta.cta'> &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    rightCard: Schema.Attribute.Component<'content.cta-card', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiFaqPageFaqPage extends Struct.SingleTypeSchema {
  collectionName: 'faq_pages';
  info: {
    description: 'FAQ page content and settings';
    displayName: 'FAQ Page';
    pluralName: 'faq-pages';
    singularName: 'faq-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    contactEmail: Schema.Attribute.String;
    contactPhone: Schema.Attribute.String;
    contactSectionDescription: Schema.Attribute.Text;
    contactSectionHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"Can't Find Your Answer?">;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    faqCategories: Schema.Attribute.JSON;
    faqItems: Schema.Attribute.Component<'content.faq-item', true>;
    heroDescription: Schema.Attribute.Text;
    heroHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Frequently Asked Questions'>;
    heroTopLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Answers to your questions'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::faq-page.faq-page'
    > &
      Schema.Attribute.Private;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    publishedAt: Schema.Attribute.DateTime;
    schema: Schema.Attribute.Component<'shared.schema-template', false>;
    scripts: Schema.Attribute.Component<'shared.script-injection', false>;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    stillHaveQuestionsCards: Schema.Attribute.Component<
      'content.cta-card',
      true
    >;
    stillHaveQuestionsDescription: Schema.Attribute.Text;
    stillHaveQuestionsHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Still Have Questions?'>;
    trustIndicators: Schema.Attribute.Component<
      'content.trust-indicator',
      true
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiGlobalSettingGlobalSetting extends Struct.SingleTypeSchema {
  collectionName: 'global_settings';
  info: {
    description: 'Site-wide settings, scripts, and SEO defaults';
    displayName: 'Global Settings';
    pluralName: 'global-settings';
    singularName: 'global-setting';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    businessAddress: Schema.Attribute.Text;
    contactEmail: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'info@clensy.com'>;
    contactPhone: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'(551) 305-4081'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    defaultOpenGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    defaultSchema: Schema.Attribute.Component<'shared.schema-template', false>;
    defaultSeo: Schema.Attribute.Component<'shared.seo', false>;
    facebookPixelId: Schema.Attribute.String;
    favicon: Schema.Attribute.Media<'images'>;
    globalBodyEndScripts: Schema.Attribute.Text;
    globalHeadScripts: Schema.Attribute.Text;
    googleAnalyticsId: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::global-setting.global-setting'
    > &
      Schema.Attribute.Private;
    logo: Schema.Attribute.Media<'images'>;
    publishedAt: Schema.Attribute.DateTime;
    robotsTxt: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'User-agent: *\nAllow: /\n\nSitemap: https://clensy.com/sitemap.xml'>;
    siteName: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Clensy'>;
    siteTagline: Schema.Attribute.String;
    socialLinks: Schema.Attribute.JSON;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiHeroSectionHeroSection extends Struct.SingleTypeSchema {
  collectionName: 'hero_sections';
  info: {
    description: 'Homepage hero section content';
    displayName: 'Hero Section';
    pluralName: 'hero-sections';
    singularName: 'hero-section';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    backgroundImageUrl: Schema.Attribute.String;
    buttonLink: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/booking'>;
    buttonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'See my price'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    feature1: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'30-second pricing'>;
    feature2: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'100% Satisfaction guaranteed'>;
    heading: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Professional cleaning for your home'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::hero-section.hero-section'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    subheading: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'We make it easy to get your home cleaned. Professional cleaning services tailored to your needs.'>;
    topLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Professional Cleaning Services'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiHowItWorkHowItWork extends Struct.SingleTypeSchema {
  collectionName: 'how_it_works';
  info: {
    description: 'How it works section content';
    displayName: 'How It Works';
    pluralName: 'how-it-works';
    singularName: 'how-it-work';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    heading: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::how-it-work.how-it-work'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    steps: Schema.Attribute.JSON;
    subheading: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiLocationLocation extends Struct.CollectionTypeSchema {
  collectionName: 'locations';
  info: {
    description: 'Service locations (Bergen, Essex, etc.)';
    displayName: 'Location';
    pluralName: 'locations';
    singularName: 'location';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    aboutDescription: Schema.Attribute.RichText;
    aboutTitle: Schema.Attribute.String;
    contactAddress: Schema.Attribute.Text;
    contactEmail: Schema.Attribute.String;
    contactPhone: Schema.Attribute.String;
    county: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ctaButton1Text: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Get a Quote'>;
    ctaButton2Text: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Contact Us'>;
    excludeFromSitemap: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    heroBackgroundImage: Schema.Attribute.Media<'images'>;
    heroBackgroundImageUrl: Schema.Attribute.String;
    heroSubtitle: Schema.Attribute.Text;
    heroTitle: Schema.Attribute.String & Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::location.location'
    > &
      Schema.Attribute.Private;
    localSeo: Schema.Attribute.Component<'shared.local-seo', false>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    operatingHours: Schema.Attribute.Component<'content.operating-hours', true>;
    publishedAt: Schema.Attribute.DateTime;
    schema: Schema.Attribute.Component<'shared.schema-template', false>;
    scripts: Schema.Attribute.Component<'shared.script-injection', false>;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    serviceAreas: Schema.Attribute.Component<'content.service-area', true>;
    slug: Schema.Attribute.UID<'name'> & Schema.Attribute.Required;
    state: Schema.Attribute.String & Schema.Attribute.DefaultTo<'NJ'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPagePage extends Struct.CollectionTypeSchema {
  collectionName: 'pages';
  info: {
    description: 'Generic pages with full SEO control';
    displayName: 'Page';
    pluralName: 'pages';
    singularName: 'page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    content: Schema.Attribute.RichText;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    excludeFromSitemap: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    featuredImage: Schema.Attribute.Media<'images'>;
    htmlBlocks: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::page.page'> &
      Schema.Attribute.Private;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    publishedAt: Schema.Attribute.DateTime;
    scripts: Schema.Attribute.Component<'shared.script-injection', false>;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPrivacyPolicyPrivacyPolicy extends Struct.SingleTypeSchema {
  collectionName: 'privacy_policies';
  info: {
    description: 'Privacy policy page content';
    displayName: 'Privacy Policy';
    pluralName: 'privacy-policies';
    singularName: 'privacy-policy';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    lastUpdated: Schema.Attribute.Date;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::privacy-policy.privacy-policy'
    > &
      Schema.Attribute.Private;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Privacy Policy'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiRedirectRedirect extends Struct.CollectionTypeSchema {
  collectionName: 'redirects';
  info: {
    description: '301 redirect management';
    displayName: 'Redirect';
    pluralName: 'redirects';
    singularName: 'redirect';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    fromPath: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::redirect.redirect'
    > &
      Schema.Attribute.Private;
    notes: Schema.Attribute.Text;
    publishedAt: Schema.Attribute.DateTime;
    statusCode: Schema.Attribute.Enumeration<
      ['permanent_301', 'temporary_302', 'temporary_307', 'permanent_308']
    > &
      Schema.Attribute.DefaultTo<'permanent_301'>;
    toPath: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiReviewReview extends Struct.SingleTypeSchema {
  collectionName: 'reviews';
  info: {
    description: 'Reviews section settings';
    displayName: 'Reviews Section';
    pluralName: 'reviews';
    singularName: 'review';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    buttonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Load More'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    heading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'What People Are Saying About Us'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::review.review'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    testimonials: Schema.Attribute.Component<'content.testimonial', true>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiServiceService extends Struct.CollectionTypeSchema {
  collectionName: 'services';
  info: {
    description: 'Cleaning services (routine, deep, airbnb, etc.)';
    displayName: 'Service';
    pluralName: 'services';
    singularName: 'service';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    benefit1Description: Schema.Attribute.Text;
    benefit1Title: Schema.Attribute.String;
    benefit2Description: Schema.Attribute.Text;
    benefit2Title: Schema.Attribute.String;
    benefit3Description: Schema.Attribute.Text;
    benefit3Title: Schema.Attribute.String;
    benefitsHeading: Schema.Attribute.String;
    benefitsImage: Schema.Attribute.Media<'images'>;
    benefitsSubheading: Schema.Attribute.Text;
    cleaningAreas: Schema.Attribute.Component<'content.cleaning-area', true>;
    clientTestimonials: Schema.Attribute.Component<'content.testimonial', true>;
    clientTestimonialsHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'What Our Clients Say'>;
    clientTestimonialsSubheading: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    excludeFromSitemap: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    faqs: Schema.Attribute.Component<'content.faq-item', true>;
    featureSectionHeading: Schema.Attribute.String;
    featureSectionImage: Schema.Attribute.Media<'images'>;
    featureSectionPoints: Schema.Attribute.JSON;
    featureSectionSubheading: Schema.Attribute.Text;
    frequencyGuideHeading: Schema.Attribute.String;
    frequencyGuideSubheading: Schema.Attribute.Text;
    frequencyOptions: Schema.Attribute.JSON;
    heroBackgroundImage: Schema.Attribute.Media<'images'>;
    heroBackgroundImageUrl: Schema.Attribute.String;
    heroHeading: Schema.Attribute.String & Schema.Attribute.Required;
    heroServiceDuration: Schema.Attribute.String;
    heroServiceGuarantee: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'100% Satisfaction'>;
    heroSubheading: Schema.Attribute.Text;
    heroTopLabel: Schema.Attribute.String;
    howItWorksHeading: Schema.Attribute.String;
    howItWorksSubheading: Schema.Attribute.Text;
    includedSectionHeading: Schema.Attribute.String;
    includedSectionSubheading: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::service.service'
    > &
      Schema.Attribute.Private;
    localSeo: Schema.Attribute.Component<'shared.local-seo', false>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    publishedAt: Schema.Attribute.DateTime;
    schema: Schema.Attribute.Component<'shared.schema-template', false>;
    scripts: Schema.Attribute.Component<'shared.script-injection', false>;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    serviceType: Schema.Attribute.Enumeration<
      [
        'routine',
        'deep',
        'airbnb',
        'moving',
        'post-construction',
        'office',
        'medical',
        'gym',
        'retail',
        'school',
        'property',
        'extras',
        'other-commercial',
      ]
    > &
      Schema.Attribute.Required;
    slug: Schema.Attribute.UID<'name'> & Schema.Attribute.Required;
    step1Description: Schema.Attribute.Text;
    step1Image: Schema.Attribute.Media<'images'>;
    step1Title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Book Online'>;
    step2Description: Schema.Attribute.Text;
    step2Image: Schema.Attribute.Media<'images'>;
    step2Title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'We Clean'>;
    step3Description: Schema.Attribute.Text;
    step3Image: Schema.Attribute.Media<'images'>;
    step3Title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Relax & Enjoy'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTermsOfServiceTermsOfService
  extends Struct.SingleTypeSchema {
  collectionName: 'terms_of_services';
  info: {
    description: 'Terms of service page content';
    displayName: 'Terms of Service';
    pluralName: 'terms-of-services';
    singularName: 'terms-of-service';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    lastUpdated: Schema.Attribute.Date;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::terms-of-service.terms-of-service'
    > &
      Schema.Attribute.Private;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Terms of Service'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesRelease
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    releasedAt: Schema.Attribute.DateTime;
    scheduledAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Schema.Attribute.Required;
    timezone: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    entryDocumentId: Schema.Attribute.String;
    isEntryValid: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    release: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Schema.Attribute.Enumeration<['publish', 'unpublish']> &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginI18NLocale extends Struct.CollectionTypeSchema {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::i18n.locale'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflow
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows';
  info: {
    description: '';
    displayName: 'Workflow';
    name: 'Workflow';
    pluralName: 'workflows';
    singularName: 'workflow';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentTypes: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'[]'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    stageRequiredToPublish: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::review-workflows.workflow-stage'
    >;
    stages: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflowStage
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows_stages';
  info: {
    description: '';
    displayName: 'Stages';
    name: 'Workflow Stage';
    pluralName: 'workflow-stages';
    singularName: 'workflow-stage';
  };
  options: {
    draftAndPublish: false;
    version: '1.1.0';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#4945FF'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    permissions: Schema.Attribute.Relation<'manyToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    workflow: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::review-workflows.workflow'
    >;
  };
}

export interface PluginUploadFile extends Struct.CollectionTypeSchema {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Schema.Attribute.Text;
    caption: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ext: Schema.Attribute.String;
    folder: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'> &
      Schema.Attribute.Private;
    folderPath: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    formats: Schema.Attribute.JSON;
    hash: Schema.Attribute.String & Schema.Attribute.Required;
    height: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.file'
    > &
      Schema.Attribute.Private;
    mime: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    previewUrl: Schema.Attribute.Text;
    provider: Schema.Attribute.String & Schema.Attribute.Required;
    provider_metadata: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    related: Schema.Attribute.Relation<'morphToMany'>;
    size: Schema.Attribute.Decimal & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.Text & Schema.Attribute.Required;
    width: Schema.Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Struct.CollectionTypeSchema {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.folder'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    files: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.file'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.folder'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    parent: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'>;
    path: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    pathId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.role'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.String & Schema.Attribute.Unique;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    blocked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    confirmationToken: Schema.Attribute.String & Schema.Attribute.Private;
    confirmed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    > &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ContentTypeSchemas {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::audit-log': AdminAuditLog;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::session': AdminSession;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::about.about': ApiAboutAbout;
      'api::blog-post.blog-post': ApiBlogPostBlogPost;
      'api::careers-page.careers-page': ApiCareersPageCareersPage;
      'api::checklist.checklist': ApiChecklistChecklist;
      'api::comparison.comparison': ApiComparisonComparison;
      'api::contact.contact': ApiContactContact;
      'api::cta.cta': ApiCtaCta;
      'api::faq-page.faq-page': ApiFaqPageFaqPage;
      'api::global-setting.global-setting': ApiGlobalSettingGlobalSetting;
      'api::hero-section.hero-section': ApiHeroSectionHeroSection;
      'api::how-it-work.how-it-work': ApiHowItWorkHowItWork;
      'api::location.location': ApiLocationLocation;
      'api::page.page': ApiPagePage;
      'api::privacy-policy.privacy-policy': ApiPrivacyPolicyPrivacyPolicy;
      'api::redirect.redirect': ApiRedirectRedirect;
      'api::review.review': ApiReviewReview;
      'api::service.service': ApiServiceService;
      'api::terms-of-service.terms-of-service': ApiTermsOfServiceTermsOfService;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::review-workflows.workflow': PluginReviewWorkflowsWorkflow;
      'plugin::review-workflows.workflow-stage': PluginReviewWorkflowsWorkflowStage;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
