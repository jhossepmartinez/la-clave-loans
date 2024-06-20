import { useState, useEffect } from "react";

export const useUf = () => {
	const [ufValue, setUfValue] = useState(null);
	const [ufTimeStamp, setUfTimeStamp] = useState(null);

	useEffect(() => {
		fetch("https://api.cmfchile.cl/api-sbifv3/recursos_api/uf?apikey=d6de0b53a079216792c02b5ddb80dc55ab2c142b&formato=json")
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw new Error("API Error: " + res.status);
				}
			})
			.then((data) => {
				if (data.UFs && data.UFs.length > 0) {
					setUfValue(parseFloat(data.UFs[0].Valor.replace(".", "").replace(",", ".")));
					setUfTimeStamp(data.UFs[0].Fecha.replaceAll("-", "/"));
				} else {
					setUfValue(0);
					setUfTimeStamp("N/A");
				}
			})
			.catch(() => {
				setUfValue(0);
				setUfTimeStamp("N/A");
			});
	}, []);

	return { ufValue, ufTimeStamp };
};

export const useEuro = () => {
	const [euroValue, setEuroValue] = useState(null);
	const [euroTimeStamp, setEuroTimeStamp] = useState(null);

	useEffect(() => {
		fetch("https://api.cmfchile.cl/api-sbifv3/recursos_api/euro?apikey=d6de0b53a079216792c02b5ddb80dc55ab2c142b&formato=json")
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw new Error("API Error: " + res.status);
				}
			})
			.then((data) => {
				if (data.Euros && data.Euros.length > 0) {
					setEuroValue((parseFloat(data.Euros[0].Valor.replace(".", "").replace(",", "."))).toFixed(2));
					setEuroTimeStamp(data.Euros[0].Fecha.replaceAll("-", "/"));
				} else {
					setEuroValue(0);
					setEuroTimeStamp("N/A");
				}
			})
			.catch(() => {
				setEuroValue(0);
				setEuroTimeStamp("N/A");
			});
	}, []);

	return { euroValue, euroTimeStamp };
};

export const useDolar = () => {
	const [dolarValue, setDolarValue] = useState(null);
	const [dolarTimeStamp, setDolarTimeStamp] = useState(null);

	useEffect(() => {
		fetch("https://api.cmfchile.cl/api-sbifv3/recursos_api/dolar?apikey=d6de0b53a079216792c02b5ddb80dc55ab2c142b&formato=json")
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw new Error("API Error: " + res.status);
				}
			})
			.then((data) => {
				if (data.Dolares && data.Dolares.length > 0) {
					setDolarValue(parseFloat(data.Dolares[0].Valor).toFixed(2));
					setDolarTimeStamp(data.Dolares[0].Fecha.replaceAll("-", "/"));
				} else {
					setDolarValue(0);
					setDolarTimeStamp("N/A");
				}
			})
			.catch(() => {
				setDolarValue(0);
				setDolarTimeStamp("N/A");
			});
	}, []);

	return { dolarValue, dolarTimeStamp };
};

export const useUTM = () => {
	const [UTMValue, setUTMValue] = useState(null);
	const [UTMTimeStamp, setUTMTimeStamp] = useState(null);

	useEffect(() => {
		fetch("https://api.cmfchile.cl/api-sbifv3/recursos_api/utm?apikey=d6de0b53a079216792c02b5ddb80dc55ab2c142b&formato=json")
			.then((res) => res.json())
			.then((data) => {
				if (data.UTMs && data.UTMs.length > 0) {
					setUTMValue(1000 * parseFloat(data.UTMs[0].Valor));
					setUTMTimeStamp(data.UTMs[0].Fecha.replaceAll("-", "/"));
				} else {
					setUTMValue(0);
					setUTMTimeStamp("N/A");
				}
			})
			.catch(() => {
				setUTMValue(0);
				setUTMTimeStamp("N/A");
			});
	}, []);

	return { UTMValue, UTMTimeStamp };
};

