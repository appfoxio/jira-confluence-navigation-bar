package co.uk.jackgraves.impl;

import com.atlassian.plugin.spring.scanner.annotation.export.ExportAsService;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.sal.api.ApplicationProperties;
import co.uk.jackgraves.api.NavBarComponent;

import javax.inject.Inject;
import javax.inject.Named;

@ExportAsService ({NavBarComponent.class})
@Named ("myPluginComponent")
public class NavBarComponentImpl implements NavBarComponent
{
    @ComponentImport
    private final ApplicationProperties applicationProperties;

    @Inject
    public NavBarComponentImpl(final ApplicationProperties applicationProperties)
    {
        this.applicationProperties = applicationProperties;
    }

    public String getName()
    {
        if(null != applicationProperties)
        {
            return "myComponent:" + applicationProperties.getDisplayName();
        }
        
        return "myComponent";
    }
}
