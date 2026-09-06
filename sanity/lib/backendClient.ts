import "server-only";
import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const backendClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  //  revalidation
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_API_READ_TOKEN,
});
