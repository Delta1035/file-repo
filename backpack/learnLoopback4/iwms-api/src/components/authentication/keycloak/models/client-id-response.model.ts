/**
 * 專案名稱： POEM 輕量級進度管理平台
 * 部門代號： ML8100
 * 檔案說明： Client ID回應資料模型
 * @CREATE Thu Aug 06 2020 下午6:25:48
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

/**
 * Client ID回應資料模型
 *
 * @export
 */
export interface ClientIdResponse {
	id: string;
	clientId: string;
	surrogateAuthRequired: boolean;
	enabled: boolean;
	alwaysDisplayInConsole: boolean;
	clientAuthenticatorType: string;
	redirectUris: string[];
	webOrigins: string[];
	notBefore: number;
	bearerOnly: boolean;
	consentRequired: boolean;
	standardFlowEnabled: boolean;
	implicitFlowEnabled: boolean;
	directAccessGrantsEnabled: boolean;
	serviceAccountsEnabled: boolean;
	publicClient: boolean;
	frontchannelLogout: boolean;
	protocol: string;
	attributes: Attributes;
	fullScopeAllowed: boolean;
	nodeReRegistrationTimeout: number;
	defaultClientScopes: string[];
	optionalClientScopes: string[];
	access: Access;
}

/**
 *
 *
 * @interface Access
 */
interface Access {
	view: boolean;
	configure: boolean;
	manage: boolean;
}

/**
 *
 *
 * @interface Attributes
 */
interface Attributes {
	'saml.assertion.signature': string;
	'saml.force.post.binding': string;
	'saml.multivalued.roles': string;
	'saml.encrypt': string;
	'saml.server.signature': string;
	'saml.server.signature.keyinfo.ext': string;
	'exclude.session.state.from.auth.response': string;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'saml_force_name_id_format': string;
	'saml.client.signature': string;
	'tls.client.certificate.bound.access.tokens': string;
	'saml.authnstatement': string;
	'display.on.consent.screen': string;
	'saml.onetimeuse.condition': string;
}
