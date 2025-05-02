import type { InferSelectModel } from 'drizzle-orm';
import { projects } from '../schema/projects';

export type ProjectsType = InferSelectModel<typeof projects>;
