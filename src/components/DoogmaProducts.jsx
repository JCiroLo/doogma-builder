import { useMemo, useState } from "react";
import useBuilder from "../hooks/useBuilder";
import { fetchJson } from "../lib/Doogma";

import admin_oreo_weddings_development from "../products/development/admin-oreo-weddings-development.json";
import design_oreo_weddings_development from "../products/development/design-oreo-weddings-development.json";
import dog_tag_development from "../products/development/dog-tag-development.json";
import lagolfcp_development from "../products/development/lagolfcp-development.json";
import mdt_development from "../products/development/mdt-development.json";
import oreo_corp_development from "../products/development/oreo-corp-development.json";
import oreo_weddings_development from "../products/development/oreo-weddings-development.json";
import oreocp3_development from "../products/development/oreocp3-development.json";
import primadonna_lux_development from "../products/development/primadonna-lux-development.json";

import custom_oreo_weddings_live1 from "../products/production/custom-oreo-weddings-live1.json";
import lagolfcp_live1 from "../products/production/lagolfcp-live1.json";
import oreo_corp_live1 from "../products/production/oreo-corp-live1.json";
import pastease_live1 from "../products/production/pastease-live1.json";
import { Box, Button, Grid, InputLabel, MenuItem, NativeSelect, Select, Typography } from "@mui/material";

const env = "dev";

function DoogmaProducts() {
  const [{ json }, setCode, setCss] = useBuilder();

  const [enviroment, setEnviroment] = useState("");
  const [product, setProduct] = useState("");

  const domain = useMemo(() => "https://cdncxb.doogma.com", []);
  const products = useMemo(
    () => ({
      development: {
        admin_oreo_weddings: {
          name: "Admin Oreo Weddings",
          json: `${domain}/development/configs/admin-oreo-weddings-development.json`,
          css: `${domain}/development/styles/admin-oreo-weddings-development.css`,
          jsonDev: admin_oreo_weddings_development,
          cssDev: "src/products/css/development/admin-oreo-weddings-development.css",
        },
        design_oreo_weddings: {
          name: "Design Oreo Weddings",
          json: `${domain}/development/configs/design-oreo-weddings-development.json`,
          css: `${domain}/development/styles/design-oreo-weddings-development.css`,
          jsonDev: design_oreo_weddings_development,
          cssDev: "src/products/css/development/design-oreo-weddings-development.css",
        },
        dog_tag: {
          name: "Dog Tag",
          json: `${domain}/development/configs/dog-tag-development.json`,
          css: `${domain}/development/styles/dog-tag-development.css`,
          jsonDev: dog_tag_development,
          cssDev: "src/products/css/development/dog-tag-development.css",
        },
        lagolfcp: {
          name: "Lagolfpc",
          json: `${domain}/development/configs/lagolfcp-development.json`,
          css: `${domain}/development/styles/lagolfcp-development.css`,
          jsonDev: lagolfcp_development,
          cssDev: "src/products/css/development/lagolfcp-development.css",
        },
        mdt: {
          name: "MDT",
          json: `${domain}/development/configs/mdt-development.json`,
          css: `${domain}/development/styles/mdt-development.css`,
          jsonDev: mdt_development,
          cssDev: "src/products/css/development/mdt-development.css",
        },
        oreo_corp: {
          name: "Oreo Corp",
          json: `${domain}/development/configs/oreo-corp-development.json`,
          css: `${domain}/development/styles/oreo-corp-development.css`,
          jsonDev: oreo_corp_development,
          cssDev: "src/products/css/development/oreo-corp-development.css",
        },
        oreo_weddings: {
          name: "Oreo Weddings",
          json: `${domain}/development/configs/oreo-weddings-development.json`,
          css: `${domain}/development/styles/oreo-weddings-development.css`,
          jsonDev: oreo_weddings_development,
          cssDev: "src/products/css/development/oreo-weddings-development.css",
        },
        oreocp3: {
          name: "Oreo CP3",
          json: `${domain}/development/configs/oreocp3-development.json`,
          css: `${domain}/development/styles/oreocp3-development.css`,
          jsonDev: oreocp3_development,
          cssDev: "src/products/css/development/oreocp3.css",
        },
        primadonna_lux: {
          name: "Primadonna Lux",
          json: `${domain}/development/configs/primadonna-lux-development.json`,
          css: `${domain}/development/styles/primadonna-lux-development.css`,
          jsonDev: primadonna_lux_development,
          cssDev: "src/products/css/development/primadonna-lux-development.css",
        },
      },
      production: {
        custom_oreo_weddings: {
          name: "Custom Oreo Weddings",
          json: `${domain}/production/configs/custom-oreo-weddings-live1.json`,
          css: `${domain}/production/styles/custom-oreo-weddings-live1.css`,
          jsonDev: custom_oreo_weddings_live1,
          cssDev: "src/products/css/production/custom-oreo-weddings-live1.css",
        },
        lagolfcp: {
          name: "Lagol FPC",
          json: `${domain}/production/configs/lagolfcp-live1.json`,
          css: `${domain}/production/styles/lagolfcp-live1.css`,
          jsonDev: lagolfcp_live1,
          cssDev: "src/products/css/production/lagolfcp-live1.css",
        },
        oreo_corp: {
          name: "Oreo Corp",
          json: `${domain}/production/configs/oreo-corp-live1.json`,
          css: `${domain}/production/styles/oreo-corp-live1.css`,
          jsonDev: oreo_corp_live1,
          cssDev: "src/products/css/production/oreo-corp-live1.css",
        },
        pastease: {
          name: "Pastease",
          json: `${domain}/production/configs/pastease-live1.json`,
          css: `${domain}/production/styles/pastease-live1.css`,
          jsonDev: pastease_live1,
          cssDev: "src/products/css/production/pastease-live1.css",
        },
      },
    }),
    [domain]
  );

  const handleChangeJSON = async (event) => {
    event.preventDefault();

    const json =
      env === "dev"
        ? JSON.stringify(products[enviroment][product].jsonDev)
        : JSON.stringify(await fetchJson(products[enviroment][product].json));

    const css = env === "dev" ? products[enviroment][product].cssDev : products[enviroment][product].css;

    setCode(json);
    setCss(css);
  };

  return (
    <Box display="flex" flexDirection="column" gap={3} padding={2} margin={1} borderRadius={2} sx={{ backgroundColor: "white" }}>
      <Typography fontSize={22} fontWeight={500} color="text.primary">
        Select template
      </Typography>
      <Grid display="flex" flexDirection="column" gap={1}>
        <Typography fontSize={18} color="text.primary">
          Enviroment
        </Typography>
        <NativeSelect defaultValue={enviroment} fullWidth onChange={({ target }) => setEnviroment(target.value)}>
          <option value="">Select an option</option>
          <option value="production">Production</option>
          <option value="development">Development</option>
        </NativeSelect>
      </Grid>
      <Grid>
        <Typography fontSize={18} color="text.primary">
          Project
        </Typography>
        <NativeSelect defaultValue={product} fullWidth onChange={({ target }) => setProduct(target.value)}>
          <option value="">Select an option</option>
          {Object.keys(products[enviroment] || {}).map((product) => (
            <option key={product} value={product}>
              {products[enviroment][product].name}
            </option>
          ))}
        </NativeSelect>
      </Grid>
      <Button variant="contained" disabled={!enviroment || !product} disableElevation onClick={handleChangeJSON}>
        Load
      </Button>
    </Box>
  );
}

export default DoogmaProducts;
