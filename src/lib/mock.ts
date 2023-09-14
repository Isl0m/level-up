import { faker } from "@faker-js/faker";

import { NewCourse } from "@/db/schema/course";
import { NewLecture } from "@/db/schema/lecture";

export function generateFakeCourse() {
  const slug = faker.lorem.slug(3);
  const title = faker.lorem.words(2);
  const description = faker.lorem.words(10);
  const price = faker.number.int({ min: 100, max: 10_000 });
  const image = faker.image.url();

  return { slug, title, description, price, image };
}

export function generateFakeLecture() {
  const title = faker.lorem.words(2);
  const description = faker.lorem.words(10);
  const video = faker.image.url();

  return { title, description, video };
}
