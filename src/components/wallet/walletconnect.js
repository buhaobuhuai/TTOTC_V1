import {
    SignClient
} from '@walletconnect/sign-client'
import {
    Web3Modal
} from '@web3modal/standalone'

const projectId = '55f1214ed5baa270bf59a813c192a64d'
const namespaces = {
    eip155: {
        methods: ['eth_sign'],
        chains: ['eip155:1'],
        events: ['accountsChanged']
    }
}

// 3. Create modal client
const web3Modal = new Web3Modal({
    projectId,
    standaloneChains: namespaces.eip155.chains
})
let signClient = undefined

// 4. Initialise clients
async

function initialize() {
    try {
        signClient = await
        SignClient.init({
            projectId
        })
    } catch (err) {
        console.error(err)
    }
}

initialize()

// 5. Create connection handler
const login = async () =>
    {
        try {
            if (signClient) {
                const {
                    uri,
                    approval
                } = await
                signClient.connect({
                    requiredNamespaces: namespaces
                })
                if (uri) {
                    await
                    web3Modal.openModal({
                        uri
                    })
                    await
                    approval()
                    const accounts = await
                    web3.eth.getAccounts()
                    const account = accounts[0];
                    sessionStorage.setItem('userKey', account)
                    web3Modal.closeModal()
                }
            }
        } catch (err) {
            console.error(err)
        }
    }

export default {
    login
};
