import { faker } from "@faker-js/faker";

import { NewCourse } from "@/db/schema/course";
import { NewLecture } from "@/db/schema/lecture";

import { capitalize } from "./utils";

export function generateFakeCourse() {
  const slug = faker.lorem.slug(3);
  const title = capitalize(faker.lorem.words(2));
  const description = faker.lorem.paragraphs(3);
  const price = faker.number.int({ min: 100, max: 10_000 });
  const image = faker.image.url();

  return { slug, title, description, price, image };
}

export function generateFakeLecture() {
  const title = capitalize(faker.lorem.words(2));
  const description = faker.lorem.paragraphs(3);
  const video = faker.image.url();
  const order = 1;

  return { title, description, video, order };
}
