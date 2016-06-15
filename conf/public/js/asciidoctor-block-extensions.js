function process_block_extension(obj) {

    var attrs = obj["attrs"];
    var parent = obj["parent"];
    var reader = obj["reader"];
    var __self = obj["__self"];
    var nil = obj["nil"];
    var name = obj["name"];

    var title = (attrs['$[]']("title")),
        alt = (attrs['$[]']("alt")),
        caption = (attrs['$[]']("caption")),
        width = (attrs['$[]']("width")),
        height = (attrs['$[]']("height")),
        scale = (attrs['$[]']("scale")),
        align = (attrs['$[]']("align")),
        type = (attrs['$[]']("type")),
        role = (attrs['$[]']("role")),
        link = (attrs['$[]']("link")),
        float = (attrs['$[]']("float")),
        imagesdir = parent.$document().$attr('imagesdir', '');

    var filename = "";

    if (!attrs['$[]']("file")["$nil?"]()) {
        filename = "" + attrs['$[]']("file");
    }
    else if (!attrs['$[]'](2)["$nil?"]()) {
        var extension = attrs['$[]'](3)["$nil?"]() ? "" : "." + attrs['$[]'](3);
        filename = "" + attrs['$[]'](2) + extension;
    }

    var command = name;
    var content = reader.$read();

    if (filename != "") {
        target = parent.$image_uri(filename);
    }
    else {
        target = parent._cached_image_uri(content);
        //var host = ((typeof location) != "undefined") ? location.host : "";
        //filename = "http://" + host + filename;
        filename = target;
    }


    var stems = ["stem", "asciimath", "latexmath", "mathml"];
    if (stems.indexOf(name) != -1) {
        content = parseStems(parent, content, name);
        command = "math";
    }

    var parameters = [content, type, imagesdir, target, name].map(function (e) {
        return e + "";
    });

    //afx[command].apply(afx,parameters);

    postMessage(JSON.stringify({
        type: "afx",
        func: command,
        parameters: parameters
    }));

    var attributes = {
        "target": filename,
        "title": title,
        "alt": alt,
        "caption": caption,
        "width": width,
        "height": height,
        "scale": scale,
        "align": align,
        "role": role,
        "link": link,
        "float": float
    };

    var keys = Object.keys(attributes);

    keys.forEach(function (key) {
        if (attributes[key]["$nil?"]()) {
            delete attributes[key];
        }
    });

    return __self.$create_image_block(parent, Opal.hash(attributes));

};


function registerBlockExtensions(name) {
    /* Generated by Opal 0.8.0 */
    Opal.modules[name + "-block/extension"] = function (Opal) {
        Opal.dynamic_require_severity = "ignore";
        var __self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $hash2 = Opal.hash2;

        if ($scope.get('RUBY_ENGINE')['$==']("opal")) {
        }
        ;
        __self.$include(Opal.get('Asciidoctor'));
        return (function ($base, $super) {
            function $ExtensionBlock() {
            };
            var __self = $ExtensionBlock = $klass($base, $super, (name + 'ExtensionBlock'), $ExtensionBlock);

            var def = __self.$$proto, $scope = __self.$$scope;

            __self.$use_dsl();
            __self.$named(name);
            __self.$on_context(["open", "literal", "listing", "pass"]);
            __self.$parse_content_as("literal");

            return (def.$process = function (parent, reader, attrs) {

                    var $a, __self = this;

                    return process_block_extension({
                        parent: parent,
                        reader: reader,
                        attrs: attrs,
                        __self: __self,
                        nil: nil,
                        name: name
                    });

                }, nil) && 'process';
        })(__self, (($scope.get('Extensions')).$$scope.get('BlockProcessor')));
    };
    /* Generated by Opal 0.8.0 */
    Opal.modules[name + "-block"] = function (Opal) {
        Opal.dynamic_require_severity = "ignore";
        var $a, $b, TMP_1, __self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice;

        if ($scope.get('RUBY_ENGINE')['$==']("opal")) {
            __self.$require(name + "-block/extension")
        }
        ;
        return ($a = ($b = $scope.get('Extensions')).$register, $a.$$p = (TMP_1 = function () {
            var self = TMP_1.$$s || this;

            return self.$block($scope.get(name + 'ExtensionBlock'))
        }, TMP_1.$$s = __self, TMP_1), $a).call($b);
    };

    Opal.require(name + '-block');
    Opal.require(name + '-block/extension');
}


["uml", "plantuml", "ditaa", "math", "graphviz", "tree", "stem", "asciimath", "latexmath", "mathml"].forEach(function (name) {
    registerBlockExtensions(name);
});