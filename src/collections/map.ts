export function mapToObj<T> (map: Map<string, T>): { [key: string]: T } {

	const obj = {};

	map.forEach((value, key) => {

		obj[key] = value;

	});

	return obj;

}

export function objToMap<T> (obj: { [key: string]: T }): Map<string, T> {

	const map = new Map();

	for (const property in obj) {

		if (obj.hasOwnProperty(property)) {

			map.set(property, obj[property]);

		}

	}

	return map;

}
