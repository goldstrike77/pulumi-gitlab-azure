import * as pulumi from "@pulumi/pulumi";
import * as azure from "./pulumi-ts-module-azure";

const tags = {
    project: pulumi.getProject(),
    stack: pulumi.getStack(),
    customer: "infra",
    environment: "prd",
    owner: "somebody@gmail.com"
}

const azure_resources = [
    {
        ResourceGroup: {
            location: "eastasia",
            resourceGroupName: "rg-p-network-transit-eastasia-001",
            tags: {},
            VirtualNetwork: [
                {
                    addressSpace: {
                        addressPrefixes: ["10.10.0.0/16", "10.11.0.0/16"]
                    },
                    virtualNetworkName: "vnet-p-network-transit-eastasia-001",
                    tags: {},
                    subnets: [
                        {
                            addressPrefixes: ["10.10.0.0/23"],
                            subnetName: "snet-p-network-agw-eastasia-001",
                        },
                        {
                            addressPrefixes: ["10.10.2.0/23"],
                            subnetName: "snet-p-network-vpn-eastasia-002",
                        },
                        {
                            addressPrefixes: ["10.10.4.0/23"],
                            subnetName: "AzureBastionSubnet",
                        },
                        {
                            addressPrefixes: ["10.10.6.0/23"],
                            subnetName: "GatewaySubnet",
                        }
                    ],
                    virtualNetworkPeerings: [
                        {
                            virtualNetworkPeeringName: "vnet-p-network-transit-eastasia-001-peer-vnet-p-network-aks-eastasia-001",
                            allowForwardedTraffic: false,
                            allowGatewayTransit: true,
                            allowVirtualNetworkAccess: true,
                            useRemoteGateways: false,
                            remoteVirtualNetwork: { id: "/subscriptions/b971283c-e0b7-46a4-9496-9cbfb850ebe5/resourceGroups/rg-p-network-container-eastasia-001/providers/Microsoft.Network/virtualNetworks/vnet-p-network-aks-eastasia-001" }
                        },
                        {
                            virtualNetworkPeeringName: "vnet-p-network-transit-eastasia-001-peer-vnet-p-network-aks-eastasia-002",
                            allowForwardedTraffic: false,
                            allowGatewayTransit: true,
                            allowVirtualNetworkAccess: true,
                            useRemoteGateways: false,
                            remoteVirtualNetwork: { id: "/subscriptions/b971283c-e0b7-46a4-9496-9cbfb850ebe5/resourceGroups/rg-p-network-container-eastasia-001/providers/Microsoft.Network/virtualNetworks/vnet-p-network-aks-eastasia-002" }
                        },
                        {
                            virtualNetworkPeeringName: "vnet-p-network-transit-eastasia-001-peer-vnet-p-network-rds-eastasia-001",
                            allowForwardedTraffic: false,
                            allowGatewayTransit: true,
                            allowVirtualNetworkAccess: true,
                            useRemoteGateways: false,
                            remoteVirtualNetwork: { id: "/subscriptions/b971283c-e0b7-46a4-9496-9cbfb850ebe5/resourceGroups/rg-p-network-rds-eastasia-001/providers/Microsoft.Network/virtualNetworks/vnet-p-network-rds-eastasia-001" }
                        },
                        {
                            virtualNetworkPeeringName: "vnet-p-network-transit-eastasia-001-peer-vnet-p-network-rds-eastasia-002",
                            allowForwardedTraffic: false,
                            allowGatewayTransit: true,
                            allowVirtualNetworkAccess: true,
                            useRemoteGateways: false,
                            remoteVirtualNetwork: { id: "/subscriptions/b971283c-e0b7-46a4-9496-9cbfb850ebe5/resourceGroups/rg-p-network-rds-eastasia-001/providers/Microsoft.Network/virtualNetworks/vnet-p-network-rds-eastasia-002" }
                        },
                        {
                            virtualNetworkPeeringName: "vnet-p-network-transit-eastasia-001-peer-vnet-p-network-vm-eastasia-001",
                            allowForwardedTraffic: false,
                            allowGatewayTransit: true,
                            allowVirtualNetworkAccess: true,
                            useRemoteGateways: false,
                            remoteVirtualNetwork: { id: "/subscriptions/b971283c-e0b7-46a4-9496-9cbfb850ebe5/resourceGroups/rg-p-network-rds-eastasia-001/providers/Microsoft.Network/virtualNetworks/vnet-p-network-vm-eastasia-001" }
                        },
                        {
                            virtualNetworkPeeringName: "vnet-p-network-transit-eastasia-001-peer-vnet-p-network-bigdata-eastasia-001",
                            allowForwardedTraffic: false,
                            allowGatewayTransit: true,
                            allowVirtualNetworkAccess: true,
                            useRemoteGateways: false,
                            remoteVirtualNetwork: { id: "/subscriptions/b971283c-e0b7-46a4-9496-9cbfb850ebe5/resourceGroups/rg-p-network-bigdata-eastasia-001/providers/Microsoft.Network/virtualNetworks/vnet-p-network-bigdata-eastasia-001" }
                        }
                    ]
                }
            ]
        }
    },
    {
        ResourceGroup: {
            location: "eastasia",
            resourceGroupName: "rg-p-network-container-eastasia-001",
            tags: {},
            VirtualNetwork: [
                {
                    addressSpace: {
                        addressPrefixes: ["10.20.0.0/16", "10.21.0.0/16"]
                    },
                    virtualNetworkName: "vnet-p-network-aks-eastasia-001",
                    tags: {},
                    subnets: [
                        {
                            addressPrefixes: ["10.20.0.0/23"],
                            subnetName: "snet-p-network-aks-eastasia-001",
                            networkSecurityGroup: {
                                id: "/subscriptions/b971283c-e0b7-46a4-9496-9cbfb850ebe5/resourceGroups/rg-p-network-container-eastasia-001/providers/Microsoft.Network/networkSecurityGroups/nsg-snet-p-network-aks-eastasia-001"
                            }
                        },
                        {
                            addressPrefixes: ["10.20.2.0/23"],
                            subnetName: "snet-p-network-aks-eastasia-002",
                        }
                    ],
                    virtualNetworkPeerings: [
                        {
                            virtualNetworkPeeringName: "vnet-p-network-aks-eastasia-001-p-vnet-p-network-transit-eastasia-001",
                            allowForwardedTraffic: true,
                            allowGatewayTransit: false,
                            allowVirtualNetworkAccess: true,
                            useRemoteGateways: false, // 部署网关后启用。
                            remoteVirtualNetwork: { id: "/subscriptions/b971283c-e0b7-46a4-9496-9cbfb850ebe5/resourceGroups/rg-p-network-transit-eastasia-001/providers/Microsoft.Network/virtualNetworks/vnet-p-network-transit-eastasia-001" }
                        }
                    ]
                },
                {
                    addressSpace: {
                        addressPrefixes: ["10.22.0.0/16", "10.23.0.0/16"]
                    },
                    virtualNetworkName: "vnet-p-network-aks-eastasia-002",
                    tags: {},
                    subnets: [
                        {
                            addressPrefixes: ["10.22.0.0/23"],
                            subnetName: "snet-p-network-aks-eastasia-003",
                        },
                        {
                            addressPrefixes: ["10.22.2.0/23"],
                            subnetName: "snet-p-network-aks-eastasia-004",
                        }
                    ],
                    virtualNetworkPeerings: [
                        {
                            virtualNetworkPeeringName: "vnet-p-network-aks-eastasia-002-p-vnet-p-network-transit-eastasia-001",
                            allowForwardedTraffic: true,
                            allowGatewayTransit: false,
                            allowVirtualNetworkAccess: true,
                            useRemoteGateways: false, // 部署网关后启用。
                            remoteVirtualNetwork: { id: "/subscriptions/b971283c-e0b7-46a4-9496-9cbfb850ebe5/resourceGroups/rg-p-network-transit-eastasia-001/providers/Microsoft.Network/virtualNetworks/vnet-p-network-transit-eastasia-001" }
                        }
                    ]
                }
            ],
            NetworkSecurityGroup: [
                {
                    networkSecurityGroupName: "nsg-snet-p-network-aks-eastasia-001",
                    securityRules: [
                        {
                            access: "Allow",
                            direction: "Inbound",
                            protocol: "Tcp",
                            sourceAddressPrefix: "*",
                            sourcePortRange: "*",
                            destinationAddressPrefix: "*",
                            destinationPortRanges: ["80", "443", "8080", "8443"],
                            priority: 100,
                            name: "IBA-HTTP-TCP",
                            description: "Allow HTTP(s) traffic"
                        },
                        {
                            access: "Deny",
                            direction: "Inbound",
                            protocol: "*",
                            sourceAddressPrefix: "*",
                            sourcePortRange: "*",
                            destinationAddressPrefix: "*",
                            destinationPortRange: "*",
                            priority: 4096,
                            name: "IBD-Network-ALL",
                            description: "Default deny all"
                        }
                    ],
                    tags: {}

                }
            ]
        }
    },
    {
        ResourceGroup: {
            location: "eastasia",
            resourceGroupName: "rg-p-network-rds-eastasia-001",
            tags: {},
            VirtualNetwork: [
                {
                    addressSpace: {
                        addressPrefixes: ["10.24.0.0/16", "10.25.0.0/16"]
                    },
                    virtualNetworkName: "vnet-p-network-rds-eastasia-001",
                    tags: {},
                    subnets: [
                        {
                            addressPrefixes: ["10.24.0.0/23"],
                            subnetName: "snet-p-network-rds-eastasia-001",
                        },
                        {
                            addressPrefixes: ["10.24.2.0/23"],
                            subnetName: "snet-p-network-rds-eastasia-002",
                        }
                    ],
                    virtualNetworkPeerings: [
                        {
                            virtualNetworkPeeringName: "vnet-p-network-rds-eastasia-001-p-vnet-p-network-transit-eastasia-001",
                            allowForwardedTraffic: true,
                            allowGatewayTransit: false,
                            allowVirtualNetworkAccess: true,
                            useRemoteGateways: false, // 部署网关后启用。
                            remoteVirtualNetwork: { id: "/subscriptions/b971283c-e0b7-46a4-9496-9cbfb850ebe5/resourceGroups/rg-p-network-transit-eastasia-001/providers/Microsoft.Network/virtualNetworks/vnet-p-network-transit-eastasia-001" }
                        }
                    ]
                },
                {
                    addressSpace: {
                        addressPrefixes: ["10.26.0.0/16", "10.27.0.0/16"]
                    },
                    virtualNetworkName: "vnet-p-network-rds-eastasia-002",
                    tags: {},
                    subnets: [
                        {
                            addressPrefixes: ["10.26.0.0/23"],
                            subnetName: "snet-p-network-rds-eastasia-003",
                        },
                        {
                            addressPrefixes: ["10.26.2.0/23"],
                            subnetName: "snet-p-network-rds-eastasia-004",
                        }
                    ],
                    virtualNetworkPeerings: [
                        {
                            virtualNetworkPeeringName: "vnet-p-network-rds-eastasia-002-p-vnet-p-network-transit-eastasia-001",
                            allowForwardedTraffic: true,
                            allowGatewayTransit: false,
                            allowVirtualNetworkAccess: true,
                            useRemoteGateways: false, // 部署网关后启用。
                            remoteVirtualNetwork: { id: "/subscriptions/b971283c-e0b7-46a4-9496-9cbfb850ebe5/resourceGroups/rg-p-network-transit-eastasia-001/providers/Microsoft.Network/virtualNetworks/vnet-p-network-transit-eastasia-001" }
                        }
                    ]
                },
                {
                    addressSpace: {
                        addressPrefixes: ["10.28.0.0/16", "10.29.0.0/16"]
                    },
                    virtualNetworkName: "vnet-p-network-vm-eastasia-001",
                    tags: {},
                    subnets: [
                        {
                            addressPrefixes: ["10.28.0.0/23"],
                            subnetName: "snet-p-network-vm-eastasia-001",
                        },
                        {
                            addressPrefixes: ["10.28.2.0/23"],
                            subnetName: "snet-p-network-vm-eastasia-002",
                        }
                    ],
                    virtualNetworkPeerings: [
                        {
                            virtualNetworkPeeringName: "vnet-p-network-vm-eastasia-001-peer-vnet-p-network-transit-eastasia-001",
                            allowForwardedTraffic: true,
                            allowGatewayTransit: false,
                            allowVirtualNetworkAccess: true,
                            useRemoteGateways: false, // 部署网关后启用。
                            remoteVirtualNetwork: { id: "/subscriptions/b971283c-e0b7-46a4-9496-9cbfb850ebe5/resourceGroups/rg-p-network-transit-eastasia-001/providers/Microsoft.Network/virtualNetworks/vnet-p-network-transit-eastasia-001" }
                        }
                    ]
                }
            ]
        }
    },
    {
        ResourceGroup: {
            location: "eastasia",
            resourceGroupName: "rg-p-network-bigdata-eastasia-001",
            tags: {},
            VirtualNetwork: [
                {
                    addressSpace: {
                        addressPrefixes: ["10.30.0.0/16", "10.31.0.0/16"]
                    },
                    virtualNetworkName: "vnet-p-network-bigdata-eastasia-001",
                    tags: {},
                    subnets: [
                        {
                            addressPrefixes: ["10.30.0.0/23"],
                            subnetName: "snet-p-network-bigdata-eastasia-001",
                        },
                        {
                            addressPrefixes: ["10.30.2.0/23"],
                            subnetName: "snet-p-network-bigdata-eastasia-002",
                        }
                    ],
                    virtualNetworkPeerings: [
                        {
                            virtualNetworkPeeringName: "vnet-p-network-bigdata-eastasia-001-p-vnet-p-network-transit-eastasia-001",
                            allowForwardedTraffic: true,
                            allowGatewayTransit: false,
                            allowVirtualNetworkAccess: true,
                            useRemoteGateways: false, // 部署网关后启用。
                            remoteVirtualNetwork: { id: "/subscriptions/b971283c-e0b7-46a4-9496-9cbfb850ebe5/resourceGroups/rg-p-network-transit-eastasia-001/providers/Microsoft.Network/virtualNetworks/vnet-p-network-transit-eastasia-001" }
                        }
                    ]
                }
            ]
        }
    }
]

const resourcegroup = new azure.resources.ResourceGroup('ResourceGroup', {
    resources: azure_resources,
    tags: tags || {}
})

const networksecuritygroup = new azure.network.NetworkSecurityGroup('NetworkSecurityGroup', {
    resources: azure_resources,
    tags: tags || {}
}, { dependsOn: [resourcegroup] });

const virtualnetwork = new azure.network.VirtualNetwork('VirtualNetwork', {
    resources: azure_resources,
    tags: tags || {}
}, { dependsOn: [resourcegroup] });

const subnet = new azure.network.Subnet('Subnet', {
    resources: azure_resources,
    tags: tags || {}
}, { dependsOn: [virtualnetwork, networksecuritygroup] });

const virtualnetworkpeering = new azure.network.VirtualNetworkPeering('VirtualNetworkPeering', {
    resources: azure_resources,
    tags: tags || {}
}, { dependsOn: [subnet] });
