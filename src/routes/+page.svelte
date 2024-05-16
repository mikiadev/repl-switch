<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js'
	import { Switch } from '$lib/components/ui/switch/index.js'
	import { z } from 'zod'
	import { zodClient } from 'sveltekit-superforms/adapters'
	import SuperDebug, { superForm } from 'sveltekit-superforms'

	let { data } = $props()

	const item = $state(data?.res)

	const listingSchema = z.object({
		opts: z.array(z.string())
	})

	const opts = [
		{ id: 'a', name: 'A' },
		{ id: 'b', name: 'B' },
		{ id: 'c', name: 'C' },
		{ id: 'd', name: 'D' }
	]

	const form = superForm(item, {
		validators: zodClient(listingSchema),
		onUpdated: ({ form: updateForm }) => {
			if (!updateForm.valid) return
		},
		resetForm: false
	})
	//I don't know if this is needed below <input name={`opts[${p.id}]`} value={$formData.opts[attrs.name]} hidden />
	const { form: formData, enhance } = form
</script>

<div class="grid h-screen w-full place-content-center bg-background">
	<SuperDebug data={formData} />
	<form method="post" use:enhance>
		<div class="my-8 grid w-full grid-cols-2 gap-y-4 sm:grid-cols-4">
			{#each opts as p}
				<Form.Field {form} name={`opts[${p.id}]`} class="flex items-start space-x-3 space-y-0 p-4">
					<Form.Control let:attrs>
						<Switch
							includeInput
							{...attrs}
							bind:checked={$formData.opts[attrs.name]}
							class="rounded-md data-[state=checked]:bg-sky-400 data-[state=unchecked]:bg-sky-800"
						/>
						<div class="space-y-1 leading-none text-foreground">
							<Form.Label>{p.name}</Form.Label>
						</div>
					</Form.Control>
				</Form.Field>
			{/each}
		</div>
	</form>
</div>
