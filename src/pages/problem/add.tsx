import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/utils/api";

const AddProblemSchema = z.object({
  url: z.string(),
});

type AddProblemFormValues = z.infer<typeof AddProblemSchema>;

const AddProblemForm = () => {
  const form = useForm<AddProblemFormValues>({
    resolver: zodResolver(AddProblemSchema),
    defaultValues: {
      url: "",
    },
  });

  const addProblem = api.problem.addByUrl.useMutation();

  const onSubmit = (values: AddProblemFormValues) => {
    addProblem.mutate(values.url);
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Problem Url</FormLabel>
                <FormControl>
                  <Input placeholder="kattis problem url to add.." {...field} />
                </FormControl>
                <FormDescription>
                  The url to the problem on kattis
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Add Problem</Button>
        </form>
      </Form>
    </>
  );
};

export default AddProblemForm;
