import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { BackEndUser } from '@/api/types';
import { useEffect } from 'react';


const formSchema = z.object({
  email: z.string().optional(),
  name: z
    .string({ required_error: 'El nombre es obligatorio' })
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
  address: z.string({ required_error: 'La dirección es obligatoria' }),
  city: z.string({ required_error: 'La ciudad es obligatoria' }),
  country: z.string({ required_error: 'El país es obligatorio' }),
});

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (userProfile: UserFormData) => void;
  getUser: BackEndUser;
};

export default function UserProfileForm({ onSave, getUser }: Props) {
  const form = useForm<UserFormData>({
    defaultValues: getUser,
    resolver: zodResolver(formSchema),
  });

  useEffect (()=>{
    form.reset(getUser);
    }, [getUser, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className="space-y-6 bg-gray-50 rounded-lg p-6 max-w-xl mx-auto"
      >
        <div>
          <h2 className="text-3xl font-bold mb-1">Perfil de Usuario</h2>
          <FormDescription>
            Consulta y actualiza tu perfil de usuario
          </FormDescription>
        </div>

        {/* Email (solo lectura) */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled className="bg-gray-100 cursor-not-allowed" />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Nombre */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage className="text-red-600 mt-1" />
            </FormItem>
          )}
        />

        {/* Dirección */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage className="text-red-600 mt-1" />
            </FormItem>
          )}
        />

        {/* Ciudad y País en una fila responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ciudad</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage className="text-red-600 mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>País</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage className="text-red-600 mt-1" />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="bg-blue-600 text-white w-full py-3 text-lg font-semibold rounded-md hover:bg-blue-700 transition">
          Actualizar
        </Button>
      </form>
    </Form>
  );
}
