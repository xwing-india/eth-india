import { Etherspot } from "@etherspot/react-transaction-buidler";
import { ethers } from "ethers";
/**
 * This is all that is needed to get started.
 * To customise this, see the possible props
 * you can pass in. the docs.
 */
function RenderEtherspot() {
	const Provider: any = new ethers.providers.JsonRpcProvider(
		`https://goerli.g.alchemy.com/v2/taTLUmO3Reqx9AVzkbW5FxMQpi4mVFEU`
	);
	return <Etherspot provider={Provider} />;
}

export default RenderEtherspot;
