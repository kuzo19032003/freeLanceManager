import { title } from 'process';
import { z } from 'zod';


const taskDetailItemSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1, { message: 'Task detail name is required' }),
});

export const createTaskSchema = z.object({
    title: z.string()
        .min(2, { message: 'Title must be at least 2 characters' })
        .max(100, { message: 'Title cannot exceed 100 characters' }),

    description: z.string()
        .min(1, { message: 'Description must be at least 10 characters' })
        .max(500, { message: 'Description cannot exceed 500 characters' }),

    due_time: z.string()
        .refine((val) => {
            if (!val) return false;
            const date = new Date(val);

            if (isNaN(date.getTime())) {
                return false;
            }

            const now = new Date()
            if (date <= now) {
                return false;
            }

            return true;
        }, {
            message: 'Due date must be a valid future date'
        })
        .optional(),

    priority: z.enum(['Low', 'Medium', 'High'], {
        message: 'Priority must be one of: low, medium, high, urgent'
    }),

    // assigned_to: z.string()
    //     .min(2, { message: 'Title must be at least 2 characters' })
    //     .max(100, { message: 'Title cannot exceed 100 characters' }),

    details: z.array(taskDetailItemSchema)
        .min(1, { message: 'At least one task detail is required' }),
    attachments: z.array(z.any())

});

export type CreateTaskSchemaType = z.infer<typeof createTaskSchema>;