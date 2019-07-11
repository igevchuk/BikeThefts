declare module 'redux-thunk-actions' {
	export function createActionThunk(type: string, fn: () => any): {
		(): Promise<any>
		readonly NAME: string
		readonly START: string
		readonly SUCCEEDED: string
		readonly FAILED: string
		readonly ENDED: string
	};
	export function createActionThunk<T1>(type: string, fn: (v1: T1) => any, ...args: any): {
		(v1: T1): Promise<any>
		readonly NAME: string
		readonly START: string
		readonly SUCCEEDED: string
		readonly FAILED: string
		readonly ENDED: string
	};
	export function createActionThunk<T1, T2>(type: string, fn: (v1: T1, v2: T2) => any, ...args: any): {
		(v1: T1, v2: T2): any
		readonly NAME: string
		readonly START: string
		readonly SUCCEEDED: string
		readonly FAILED: string
		readonly ENDED: string
	};
	export function createActionThunk<T1, T2, T3>(type: string, fn: (v1: T1, v2: T2, v3: T3) => any, ...args: any): {
		(v1: T1, v2: T2, v3: T3): any
		readonly NAME: string
		readonly START: string
		readonly SUCCEEDED: string
		readonly FAILED: string
		readonly ENDED: string
	};
	export function createActionThunk<T1, T2, T3, T4>(type: string, fn: (v1: T1, v2: T2, v3: T3, v4: T4) => any, ...args: any): {
		(v1: T1, v2: T2, v3: T3, v4: T4): any
		readonly NAME: string
		readonly START: string
		readonly SUCCEEDED: string
		readonly FAILED: string
		readonly ENDED: string
	};
	export function createActionThunk<T1, T2, T3, T4, T5>(type: string, fn: (v1: T1, v2: T2, v3: T3, v4: T4, v5: T5) => any, ...args: any): {
		(v1: T1, v2: T2, v3: T3, v4: T4, v5: T5): any
		readonly NAME: string
		readonly START: string
		readonly SUCCEEDED: string
		readonly FAILED: string
		readonly ENDED: string
	};
	export function createActionThunk<T1, T2, T3, T4, T5, T6>(type: string, fn: (v1: T1, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => any, ...args: any): {
		(v1: T1, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6): any
		readonly NAME: string
		readonly START: string
		readonly SUCCEEDED: string
		readonly FAILED: string
		readonly ENDED: string
	};
	export function createActionThunk<T1, T2, T3, T4, T5, T6, T7>(type: string, fn: (v1: T1, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6, v7: T7) => any, ...args: any): {
		(v1: T1, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6, v7: T7): any
		readonly NAME: string
		readonly START: string
		readonly SUCCEEDED: string
		readonly FAILED: string
		readonly ENDED: string
	};
}
