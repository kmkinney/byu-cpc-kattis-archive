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
  url: z.string().url(),
});

type AddProblemFormValues = z.infer<typeof AddProblemSchema>;

const AddProblemForm = () => {
  const form = useForm<AddProblemFormValues>({
    resolver: zodResolver(AddProblemSchema),
    defaultValues: {
      url: "",
    },
  });

  const { problem } = api.useContext();
  const addProblem = api.problem.addByUrl.useMutation({
    onSuccess: () => {
      problem.allProblems.refetch();
    },
  });

  const onSubmit = (values: AddProblemFormValues) => {
    addProblem.mutate(values.url);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex pb-4">
          <Button type="submit" className="mr-6 whitespace-nowrap">
            Add Problem
          </Button>
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="kattis problem url to add.." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default AddProblemForm;
