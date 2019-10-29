function camelCaseToEnglish(string) {
    return string.replace( /([A-Z])/g, " $1" );
}

function addNormalizedHeader(context, options) {
    context.commitGroups = context.commitGroups.map(group => {
        group.title = camelCaseToEnglish(group.title);

        return group
    });

    return context
}

function resolveVersionNumbers() {
    const versions = [
        { label: "PHP", compatibility: "5.6, 7.0, 7.1, 7.2", tested: "7.2" },
    ];

    return versions
}

module.exports = {
    "plugins": [
        ["@semantic-release/commit-analyzer", {
            "preset": "eslint",
            "releaseRules": [
                { "tag": "Breaking", "release": "major" },
                { "tag": "PaymentMethods", "release": "minor" },
                { "tag": "Feature", "release": "minor" },
                { "tag": "Fix", "release": "patch" }
            ]
        }],

        ["@semantic-release/release-notes-generator", {
            "preset": "eslint",
            "writerOpts": {
                "commitPartial": "* {{ message }}\n",
                "finalizeContext": addNormalizedHeader
            }
        }],

        ["@semantic-release/github", {
            "assets": [
                { "path": "package.zip", "label": "Package" }
            ]
        }],

        // ["semantic-release-compatibility-table", {
        //     resolveVersionNumbers
        // }]
    ]
};