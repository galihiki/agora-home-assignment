import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useCountriesContext } from "../../../context/CountriesContext";
import { useMemo, useState } from "react";
import { Switch, Radio, Flex } from "antd";
import "./LanguagesBarChart.scss";
import type { CheckboxGroupProps } from "antd/es/checkbox";

export default function LanguagesBarChart() {
  const { countries, isLoading, error } = useCountriesContext();
  const [moreThanOne, setMoreThanOne] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<String>("count");

  const options: CheckboxGroupProps<string>["options"] = [
    { label: "By language count", value: "count" },
    { label: "By language name", value: "name" },
  ];

  function getLanguageAndCountryCount() {
    const languageCount: Record<string, number> = {};
    const countriesCountByLanguage: Record<string, string[]> = {};
    countries?.forEach((country) => {
      const languagesObj: string[] = Object.values(country.languages);
      languagesObj.forEach((language: string) => {
        languageCount[language] = (languageCount[language] ?? 0) + 1;
        countriesCountByLanguage[language] = [
          ...(countriesCountByLanguage[language] ?? []),
          country.name.common,
        ];
      });
    });
    return { languageCount, countriesCountByLanguage };
  }

  const languageData = useMemo(() => {
    const { languageCount, countriesCountByLanguage } =
      getLanguageAndCountryCount();
    const languageCountData: {
      language: string;
      countries: number;
      countryNames: string[];
    }[] = [];
    Object.keys(languageCount).forEach((language) => {
      const data = {
        language,
        countries: languageCount[language],
        countryNames: countriesCountByLanguage[language],
      };
      if (moreThanOne) {
        if (languageCount[language] > 1) {
          languageCountData.push(data);
        }
      } else {
        languageCountData.push(data);
      }
    });
    const sortedLanguageCountData = [...languageCountData].sort((a, b) => {
      if (selectedOrder === "name") {
        return a.language.localeCompare(b.language);
      } else {
        return b.countries - a.countries;
      }
    });
    return sortedLanguageCountData;
  }, [countries, moreThanOne, selectedOrder]);

  // Custom tooltip to show country names
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;

      return (
        <div
          style={{
            background: "white",
            padding: "10px",
            borderRadius: "6px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            maxWidth: "600px",
          }}
        >
          <strong>{data.language}</strong>
          <p>
            <strong>Countries:</strong> {data.countries}
          </p>
          <p style={{ marginTop: "6px" }}>
            <strong>Country names:</strong>
            <br />
            {data.countryNames.join(", ")}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        {!isLoading && !error && (
          <BarChart
            data={languageData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid stroke="#eee" strokeDasharray="10 10" />

            <XAxis dataKey="language" />
            <YAxis />
            <Tooltip
              content={<CustomTooltip />}
              wrapperStyle={{ zIndex: 100 }}
            />
            <Legend />

            <Bar dataKey="countries" fill="#8884d8" />
          </BarChart>
        )}
      </ResponsiveContainer>
      <div className="switch-container">
        <Switch onChange={() => setMoreThanOne(!moreThanOne)} />
        <p className="lable">Languages spoken in Mupliple Countries</p>
      </div>
      <Flex className="order-container" vertical gap="middle">
        <Radio.Group
          block
          options={options}
          defaultValue={selectedOrder}
          optionType="button"
          onChange={(e) => setSelectedOrder(e.target.value)}
        />
      </Flex>
    </div>
  );
}
