import { MenuGroup, MenuItem } from '@wordpress/components';

function MenuGroupCheckboxes<T>({
	options,
	checked,
	onChange,
}: {
	options: { label: string; value: T }[];
	checked: T[];
	onChange: (value: T[]) => void;
}): JSX.Element {
	return (
		<MenuGroup>
			{options.map((option, i) => (
				<MenuItem
					key={i}
					icon={checked.includes(option.value) ? 'yes' : undefined}
					onClick={() => {
						const idx = checked.indexOf(option.value);
						const chkd = [...checked];
						if (idx >= 0) {
							chkd.splice(idx, 1);
						} else {
							chkd.push(option.value);
						}
						onChange(chkd);
					}}
				>
					{option.label}
				</MenuItem>
			))}
		</MenuGroup>
	);
}

export default MenuGroupCheckboxes;
