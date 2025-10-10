import CategoryProducts from "@/components/CategoryProducts";
import Container from "@/components/Container";
import {Title} from "@/components/Title";
import { getCategories } from "@/sanity/queries";
import React from "react";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const categories = await getCategories();
  const { slug } = await params;
  return (
    <div className="py-10">
      <Container>
        <Title className="text-xl">
          Products by Category:{" "}
          <span className=" text-shop-green">
            {slug && slug}
          </span>
        </Title>
        <CategoryProducts categories={categories} slug={slug} />
      </Container>
    </div>
  );
};

export default CategoryPage;
