'use client';

import { FormProvider as RHFProvider } from 'react-hook-form';

function FormProvider({ children, methods, onSubmit }: React.PropsWithChildren<any>) {

    return (
        <RHFProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                {children}
            </form>
        </RHFProvider>)
}

export default FormProvider;