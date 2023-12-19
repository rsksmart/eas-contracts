import { NamedAccounts } from './data/NamedAccounts';
import { DeploymentNetwork } from './utils/Constants';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-solhint';
import 'dotenv/config';
import 'hardhat-contract-sizer';
import { HardhatUserConfig } from 'hardhat/config';
import { MochaOptions } from 'mocha';

interface EnvOptions {
  ETHEREUM_PROVIDER_URL?: string;
  ETHEREUM_ARBITRUM_ONE_PROVIDER_URL?: string;
  ETHEREUM_OPTIMISM_PROVIDER_URL?: string;
  ETHEREUM_BASE_PROVIDER_URL?: string;
  ETHEREUM_POLYGON_PROVIDER_URL?: string;
  ETHEREUM_SCROLL_PROVIDER_URL?: string;
  ETHEREUM_LINEA_PROVIDER_URL?: string;
  ETHEREUM_SEPOLIA_PROVIDER_URL?: string;
  ETHEREUM_OPTIMISM_GOERLI_PROVIDER_URL?: string;
  ETHEREUM_OPTIMISM_SEPOLIA_PROVIDER_URL?: string;
  ETHEREUM_BASE_GOERLI_PROVIDER_URL?: string;
  ETHEREUM_ARBITRUM_GOERLI_PROVIDER_URL?: string;
  ETHEREUM_POLYGON_MUMBAI_PROVIDER_URL?: string;
  ETHEREUM_SCROLL_SEPOLIA_PROVIDER_URL?: string;
  ETHEREUM_LINEA_GOERLI_PROVIDER_URL?: string;
  ETHERSCAN_API_KEY?: string;
  PROFILE?: boolean;
}

const {
  ETHEREUM_PROVIDER_URL = '',
  ETHEREUM_ARBITRUM_ONE_PROVIDER_URL = '',
  ETHEREUM_OPTIMISM_PROVIDER_URL = '',
  ETHEREUM_BASE_PROVIDER_URL = '',
  ETHEREUM_POLYGON_PROVIDER_URL = '',
  ETHEREUM_SCROLL_PROVIDER_URL = '',
  ETHEREUM_LINEA_PROVIDER_URL = '',
  ETHEREUM_SEPOLIA_PROVIDER_URL = '',
  ETHEREUM_OPTIMISM_SEPOLIA_PROVIDER_URL = '',
  ETHEREUM_OPTIMISM_GOERLI_PROVIDER_URL = '',
  ETHEREUM_BASE_GOERLI_PROVIDER_URL = '',
  ETHEREUM_ARBITRUM_GOERLI_PROVIDER_URL = '',
  ETHEREUM_POLYGON_MUMBAI_PROVIDER_URL = '',
  ETHEREUM_SCROLL_SEPOLIA_PROVIDER_URL = '',
  ETHEREUM_LINEA_GOERLI_PROVIDER_URL = '',
  ETHERSCAN_API_KEY,
  PROFILE: isProfiling
}: EnvOptions = process.env as any as EnvOptions;

const mochaOptions = (): MochaOptions => {
  let timeout = 600000;
  let grep;
  let reporter;

  if (isProfiling) {
    timeout = 0;
    reporter = 'mocha-silent-reporter';
  }

  return {
    timeout,
    color: true,
    bail: true,
    grep,
    reporter
  };
};

const config: HardhatUserConfig = {
  networks: {
    [DeploymentNetwork.Hardhat]: {
      accounts: {
        count: 20,
        accountsBalance: '10000000000000000000000000000000000000000000000'
      },
      allowUnlimitedContractSize: true,
      saveDeployments: true,
      live: false
    },
    [DeploymentNetwork.Mainnet]: {
      chainId: 1,
      url: ETHEREUM_PROVIDER_URL,
      saveDeployments: true,
      live: true
    },
    [DeploymentNetwork.ArbitrumOne]: {
      chainId: 42161,
      url: ETHEREUM_ARBITRUM_ONE_PROVIDER_URL,
      saveDeployments: true,
      live: true
    },
    [DeploymentNetwork.Optimism]: {
      chainId: 10,
      url: ETHEREUM_OPTIMISM_PROVIDER_URL,
      saveDeployments: true,
      live: true
    },
    [DeploymentNetwork.Base]: {
      chainId: 8453,
      url: ETHEREUM_BASE_PROVIDER_URL,
      saveDeployments: true,
      live: true
    },
    [DeploymentNetwork.Polygon]: {
      chainId: 137,
      url: ETHEREUM_POLYGON_PROVIDER_URL,
      saveDeployments: true,
      live: true
    },
    [DeploymentNetwork.Scroll]: {
      chainId: 534352,
      url: ETHEREUM_SCROLL_PROVIDER_URL,
      saveDeployments: true,
      live: true
    },
    [DeploymentNetwork.Linea]: {
      chainId: 59144,
      url: ETHEREUM_LINEA_PROVIDER_URL,
      saveDeployments: true,
      live: true
    },
    [DeploymentNetwork.Sepolia]: {
      chainId: 11155111,
      url: ETHEREUM_SEPOLIA_PROVIDER_URL,
      saveDeployments: true,
      live: true
    },
    [DeploymentNetwork.OptimismSepolia]: {
      chainId: 11155420,
      url: ETHEREUM_OPTIMISM_SEPOLIA_PROVIDER_URL,
      saveDeployments: true,
      live: true
    },
    [DeploymentNetwork.OptimismGoerli]: {
      chainId: 420,
      url: ETHEREUM_OPTIMISM_GOERLI_PROVIDER_URL,
      saveDeployments: true,
      live: true
    },
    [DeploymentNetwork.BaseGoerli]: {
      chainId: 84531,
      url: ETHEREUM_BASE_GOERLI_PROVIDER_URL,
      saveDeployments: true,
      live: true
    },
    [DeploymentNetwork.ArbitrumGoerli]: {
      chainId: 421613,
      url: ETHEREUM_ARBITRUM_GOERLI_PROVIDER_URL,
      saveDeployments: true,
      live: true
    },
    [DeploymentNetwork.PolygonMumbai]: {
      chainId: 80001,
      url: ETHEREUM_POLYGON_MUMBAI_PROVIDER_URL,
      saveDeployments: true,
      live: true
    },
    [DeploymentNetwork.ScrollSepolia]: {
      chainId: 534351,
      url: ETHEREUM_SCROLL_SEPOLIA_PROVIDER_URL,
      saveDeployments: true,
      live: true
    },
    [DeploymentNetwork.LineaGoerli]: {
      chainId: 59140,
      url: ETHEREUM_LINEA_GOERLI_PROVIDER_URL,
      saveDeployments: true,
      live: true
    }
  },

  paths: {
    deploy: ['deploy/scripts']
  },

  solidity: {
    version: '0.8.19',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000000
      },
      metadata: {
        bytecodeHash: 'none'
      }
    }
  },

  typechain: {
    target: 'ethers-v6'
  },

  namedAccounts: NamedAccounts,

  verify: {
    etherscan: {
      apiKey: ETHERSCAN_API_KEY
    }
  },

  contractSizer: {
    alphaSort: true,
    runOnCompile: false,
    disambiguatePaths: false
  },

  gasReporter: {
    currency: 'USD',
    enabled: isProfiling
  },

  mocha: mochaOptions()
};

export default config;
