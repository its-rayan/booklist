import z from '@/lib/zod';

export const googleBookSchema = z.object({
  kind: z.string(),
  id: z.string(),
  etag: z.string(),
  selfLink: z.string(),
  volumeInfo: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    authors: z.array(z.string()).optional(),
    publisher: z.string().optional(),
    publishedDate: z.string().optional(),
    description: z.string().optional(),
    industryIdentifiers: z
      .array(
        z.object({
          type: z.string(),
          identifier: z.string()
        })
      )
      .optional(),
    pageCount: z.number().optional(),
    dimensions: z
      .object({
        height: z.string().optional(),
        width: z.string().optional(),
        thickness: z.string().optional()
      })
      .optional(),
    printType: z.string().optional(),
    mainCategory: z.string().optional(),
    categories: z.array(z.string()).optional(),
    averageRating: z.number().optional(),
    ratingsCount: z.number().optional(),
    contentVersion: z.string().optional(),
    imageLinks: z
      .object({
        smallThumbnail: z.string().optional(),
        thumbnail: z.string().optional(),
        small: z.string().optional(),
        medium: z.string().optional(),
        large: z.string().optional(),
        extraLarge: z.string().optional()
      })
      .optional(),
    language: z.string().optional(),
    previewLink: z.string().optional(),
    infoLink: z.string().optional(),
    canonicalVolumeLink: z.string().optional()
  }),
  userInfo: z
    .object({
      review: z.object({
        kind: z.string(),
        id: z.string(),
        volumeId: z.string(),
        review: z.string(),
        rating: z.number(),
        updated: z.string(),
        created: z.string(),
        userId: z.string(),
        userName: z.string(),
        userPhoto: z.string(),
        userType: z.string(),
        userEmail: z.string(),
        userLink: z.string(),
        userCountry: z.string()
      }),
      readingPosition: z.object({
        kind: z.string(),
        id: z.string(),
        volumeId: z.string(),
        position: z.number(),
        updated: z.string()
      }),
      isPurchased: z.boolean(),
      isPreordered: z.boolean()
    })
    .optional(),
  saleInfo: z
    .object({
      country: z.string(),
      saleability: z.string(),
      onSaleDate: z.string().optional(),
      isEbook: z.boolean(),
      listPrice: z
        .object({
          amount: z.number(),
          currencyCode: z.string()
        })
        .optional(),
      retailPrice: z
        .object({
          amount: z.number(),
          currencyCode: z.string()
        })
        .optional(),
      buyLink: z.string().optional()
    })
    .optional(),
  accessInfo: z
    .object({
      country: z.string(),
      viewability: z.string(),
      embeddable: z.boolean(),
      publicDomain: z.boolean(),
      textToSpeechPermission: z.string(),
      epub: z
        .object({
          isAvailable: z.boolean(),
          downloadLink: z.string().optional(),
          acsTokenLink: z.string().optional()
        })
        .optional(),
      pdf: z
        .object({
          isAvailable: z.boolean(),
          downloadLink: z.string().optional(),
          acsTokenLink: z.string().optional()
        })
        .optional(),
      webReaderLink: z.string().optional(),
      accessViewStatus: z.string(),
      downloadAccess: z
        .object({
          kind: z.string(),
          volumeId: z.string(),
          restricted: z.boolean(),
          deviceAllowed: z.boolean(),
          justAcquired: z.boolean(),
          maxDownloadDevices: z.number(),
          downloadsAcquired: z.number(),
          nonce: z.string(),
          source: z.string(),
          reasonCode: z.string(),
          message: z.string(),
          signature: z.string()
        })
        .optional()
    })
    .optional(),
  searchInfo: z
    .object({
      textSnippet: z.string().optional()
    })
    .optional()
});
